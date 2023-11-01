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
    const platformId = request.body.platformId
    if (platformId.length === 0) {
      response.status(401).json({
        message: 'Platform id is required.'
      })
      return
    }

    // get Each data of the Select accounts 
    let setOfData = [];
    platformId.forEach(async (el, index) => {
      const uid = await validateAuthorization(request.headers.authorization, admin)
      const userPlatformData = await getPlatformData(uid, firestore, el.value)
      // let result = null
      const { token, accountId, broker } = userPlatformData
      switch (broker) {
        case MT4:
          console.log(accountId, uid, getGlobalConnection, el.value, firestore)
          let result = await fetchData(token, accountId, uid, getGlobalConnection, el.value, firestore)
          // response.status(200).json(result)
          
          logger.info('Hello Result!', { structuredData: true })
          console.log(result)
          setOfData.push(result.json())
          break
        default:
          response.status(404).json({
            message: 'Default reached.'
          })
          break
      }
    })

    // return the response
    let statusRes = setOfData.length > 0 ? 200 : 404;
    response.status(statusRes).json(setOfData)
    

    // Old GET
    // const platformId = request.query.platformId
    // if (!platformId) {
    //   response.status(401).json({
    //     message: 'Platform id is required.'
    //   })
    //   return
    // }

    // const uid = await validateAuthorization(request.headers.authorization, admin)
    // const userPlatformData = await getPlatformData(uid, firestore, platformId)

    // let result = null
    // const { token, accountId, broker } = userPlatformData
    // switch (broker) {
    //   case MT4:
    //     result = await fetchData(token, accountId, uid, getGlobalConnection, platformId, firestore)
    //     response.status(200).json(result)
    //     break
    //   default:
    //     response.status(404).json({
    //       message: 'Default reached.'
    //     })
    //     break
    // }
    // response.status(200).json(userPlatformData)
  } catch (error) {
    console.error('Error:', error)
    response.status(403).json({
      message: 'Unauthorized',
      error: error.message
    })
  }
}

async function fetchData (token, accountId, uid, getGlobalConnection, platformId, firestore) {
  try {
    const connection = await getGlobalConnection(token, accountId, uid, platformId)

    const accountInformation = await connection.getAccountInformation()
    console.log('accountInformation', accountInformation)

    // Date of 1st and lasts
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const dealsResult = await connection.getDealsByTimeRange(`${firstDay}T00:00:00Z`, `${lastDay}T00:00:00Z`)
    // console.log('dealsResult', dealsResult)

    const deals = dealsResult.deals

    const firestoreTrades = await fetchTradesFromFirestore(uid, firestore)

    firestoreTrades.forEach((trade) => {
      const { close, symbol, type, volume, price, profit, commission, swap, comment, platform } = trade
      if (close) {
        deals.push({
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

    const { data: profitsByDate, baseAmount } = getTotalProfitByDate(deals)
    // console.log({ baseAmount }, { profitsByDate })

    // Exclude base amount
    const profits = profitsByDate.filter(({ profit }) => profit !== baseAmount).map((profit) => ({
      date: formatDate(profit.time),
      profit: profit.profit.toFixed(2),
      dataCount: profit.dataCount,
      trades: profit.trades
    }))

    return {
      profits,
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
