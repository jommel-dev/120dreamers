/**
 * Get current user and fetch data from firestore
 */

const { getTotalProfitByDate, validateAuthorization, getPlatformData, fetchTradesFromFirestore, formatFirebaseTimestamp } = require('./common')

// TODO: add more platforms
const MT4 = 'MetaTrader4'

exports.handler = async function (request, response, logger, admin, firestore, getGlobalConnection) {
  try {
    logger.info('Hello logs!', { structuredData: true })

    // Check the
    const platformIds = request.body.platformIds
    if (platformIds.length === 0) {
      response.status(401).json({
        message: 'Platform id is required.'
      })
      return
    }

    const resultArray = []
    const uid = await validateAuthorization(request.headers.authorization, admin)

    await Promise.all(platformIds.map(async (platform) => {
      const userPlatformData = await getPlatformData(uid, firestore, platform)
      // let result = null
      const { token, accountId, broker } = userPlatformData
      if (broker === MT4) {
        const result = await fetchData(token, accountId, uid, getGlobalConnection, platform)
        resultArray.push(result)
      }
    }))

    const deals = []
    let finalAccountInfo = {}
    let finalBalance = 0

    resultArray.forEach((result) => {
      deals.push(...result.profits)
      finalBalance += result.accountInformation.balance
    })

    if (resultArray.length > 0) {
      // Get other account info from the first result
      finalAccountInfo = {
        ...resultArray[0].accountInformation,
        balance: finalBalance
      }
    }

    const firestoreTrades = await getFirestoreTrades(uid, firestore)

    deals.push(...firestoreTrades)

    const { data: profitsByDate, baseAmount } = getTotalProfitByDate(deals)

    const profits = profitsByDate.filter(({ profit }) => profit !== baseAmount).map((profit) => ({
      date: formatDate(profit.time),
      profit: profit.profit.toFixed(2),
      dataCount: profit.dataCount,
      trades: profit.trades
    }))

    // return the response
    response.status(200).json({
      accountInformation: finalAccountInfo,
      profits
    })
  } catch (error) {
    console.error('Error:', error)
    response.status(403).json({
      message: 'Unauthorized',
      error: error.message
    })
  }
}

async function fetchData (token, accountId, uid, getGlobalConnection, platformId) {
  try {
    const connection = await getGlobalConnection(token, accountId, uid, platformId)

    const accountInformation = await connection.getAccountInformation()

    // Date of 1st and lasts
    const date = new Date()
    const firstDay = new Date(date.getFullYear(), date.getMonth() - 1, 1)
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0)

    const dealsResult = await connection.getDealsByTimeRange(firstDay.toISOString().split('.')[0] + 'Z', lastDay.toISOString().split('.')[0] + 'Z')

    const deals = dealsResult.deals

    return {
      profits: deals,
      accountInformation
    }
  } catch (e) {
    console.log('[fetchData] error:', e)
  }
}

function formatDate (dateStr) {
  const dateObj = new Date(dateStr)
  const year = dateObj.getFullYear()
  const month = String(dateObj.getMonth() + 1).padStart(2, '0') // Months are 0-based in JavaScript
  const day = String(dateObj.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

// Get imported/created trades from firestore
async function getFirestoreTrades (uid, firestore) {
  const firestoreTrades = await fetchTradesFromFirestore(uid, firestore)

  const firestoreDeals = []
  firestoreTrades.forEach((trade) => {
    const { close, symbol, type, volume, price, profit, commission, swap, comment, platform } = trade
    if (close) {
      firestoreDeals.push({
        time: formatFirebaseTimestamp(close),
        symbol,
        type,
        volume,
        price,
        profit,
        commission,
        swap,
        comment,
        platform
      })
    }
  })

  return firestoreDeals
}
