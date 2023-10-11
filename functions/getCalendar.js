/**
 * Get current user and fetch data from firestore
 */

const { getTotalProfitByDate, validateAuthorization, getPlatformData } = require('./common')

// TODO: add more platforms
const MT4 = 'MetaTrader4'

exports.handler = async function (request, response, logger, admin, firestore, getGlobalConnection) {
  try {
    logger.info('Hello logs!', { structuredData: true })

    const platform = request.query.platform
    if (!platform) {
      response.status(401).json({
        message: 'Platform is required.'
      })
      return
    }

    const uid = await validateAuthorization(request.headers.authorization, admin)
    const userPlatformData = await getPlatformData(uid, firestore)

    let result = null
    const { token, accountId } = userPlatformData
    switch (platform) {
      case MT4:
        result = await fetchData(token, accountId, uid, getGlobalConnection)
        response.status(200).json(result)
        break
      default:
        response.status(404).json({
          message: 'Default reached.'
        })
        break
    }
    // response.status(200).json(userPlatformData)
  } catch (error) {
    console.error('Error:', error)
    response.status(403).json({
      message: 'Unauthorized',
      error: error.message
    })
  }
}

async function fetchData (token, accountId, uid, getGlobalConnection) {
  try {
    const connection = await getGlobalConnection(token, accountId, uid)

    const dealsResult = await connection.getDealsByTimeRange('2023-10-01T00:00:00Z', '2023-10-30T00:00:00Z')
    // console.log('dealsResult', dealsResult)

    const deals = dealsResult.deals

    const { data: profitsByDate, baseAmount } = getTotalProfitByDate(deals)
    console.log({ baseAmount }, { profitsByDate })

    // Exclude base amount
    const profits = profitsByDate.filter(({ profit }) => profit !== baseAmount).map((profit) => ({
      date: formatDate(profit.time),
      profit: profit.profit.toFixed(2),
      dataCount: profit.dataCount
    }))

    return {
      profits
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
