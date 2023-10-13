/**
 * Get current user and fetch data from firestore
 */

const { getTotalProfitByDate, validateAuthorization, getPlatformData } = require('./common')

// TODO: add more platforms
const MT4 = 'MetaTrader4'

exports.handler = async function (request, response, logger, admin, firestore, getGlobalConnection) {
  try {
    logger.info('Hello logs!', { structuredData: true })

    const platformId = request.query.platformId
    if (!platformId) {
      response.status(401).json({
        message: 'Platform id is required.'
      })
      return
    }

    const uid = await validateAuthorization(request.headers.authorization, admin)
    const userPlatformData = await getPlatformData(uid, firestore, platformId)

    let result = null
    const { token, accountId, broker } = userPlatformData
    switch (broker) {
      case MT4:
        result = await fetchData(token, accountId, uid, getGlobalConnection, platformId)
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

async function fetchData (token, accountId, uid, getGlobalConnection, platformId) {
  try {
    const connection = await getGlobalConnection(token, accountId, uid, platformId)

    const accountInformation = await connection.getAccountInformation()
    console.log('accountInformation', accountInformation)

    const positions = await connection.getPositions()
    console.log('positions', positions)

    const orders = await connection.getOrders()
    console.log('orders', orders)

    const history = await connection.getHistoryOrdersByTimeRange('2023-10-01T00:00:00Z', '2023-10-30T00:00:00Z')
    console.log('history', history)

    const dealsResult = await connection.getDealsByTimeRange('2023-10-01T00:00:00Z', '2023-10-30T00:00:00Z')
    console.log('dealsResult', dealsResult)

    const deals = dealsResult.deals

    const profitsByDate = getTotalProfitByDate(deals).data

    const profits = profitsByDate.map((profit, index) => ({
      date: profit.time,
      profit: (profit.profit + (index > 0 ? profitsByDate[index - 1].profit : 0)).toFixed(2)
    }))

    const growth = profits.map((profit) => ({
      date: profit.date,
      growth: profit.profit === profits[0].profit ? profits[0].profit : (parseFloat(profit.profit) / 100).toFixed(2)
    }))

    const balance = growth.map((profit, index) => ({
      date: profit.date,
      balance: (index === 0 || profit.growth === growth[0].growth) ? parseFloat(profit.growth) : parseFloat(growth[0].growth) + parseFloat(profit.growth)
    }))

    return {
      accountInformation,
      positions,
      orders,
      history,
      deals,
      profits,
      growth,
      balance
    }
  } catch (e) {
    console.log(e)
  }
}
