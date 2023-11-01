/**
 * Get current user and fetch data from firestore
 */

const { getTotalProfitByDate, validateAuthorization, getPlatformData } = require('./common')

// TODO: add more platforms
const MT4 = 'MetaTrader4'

exports.handler = async function (request, response, logger, admin, firestore, getGlobalConnection) {
  try {
    logger.info('Hello logs!', { structuredData: true })

    const platformIds = request.body.platformIds

    if (!platformIds) {
      response.status(401).json({
        message: 'Platform id is required.'
      })
      return
    }

    const resultArray = []
    const uid = await validateAuthorization(request.headers.authorization, admin)

    await Promise.all(platformIds.map(async (platform) => {
      const userPlatformData = await getPlatformData(uid, firestore, platform.value)
      const { token, accountId, broker } = userPlatformData
      if (broker === MT4) {
        const result = await fetchData(token, accountId, uid, getGlobalConnection, platform.value)
        resultArray.push(result)
      }
    }))

    const deals = []
    const positions = []
    const orders = []
    const history = { historyOrders: [] }
    const profits = []
    const growth = []
    const balance = []

    let finalAccountInfo = {}
    let finalBalance = 0
    resultArray.forEach((result) => {
      deals.push(...result.profits)
      positions.push(...result.positions)
      orders.push(...result.orders)
      if (result.history.historyOrders) {
        history.historyOrders.push(...result.history.historyOrders)
      }
      profits.push(...result.profits)
      growth.push(...result.growth)
      balance.push(...result.balance)
      finalBalance += result.accountInformation.balance
    })

    if (resultArray.length > 0) {
    // Get other account info from the first result
      finalAccountInfo = {
        ...resultArray[0].accountInformation,
        balance: finalBalance
      }
    }

    // return the response
    response.status(200).json({
      accountInformation: finalAccountInfo,
      deals,
      positions,
      orders,
      history,
      profits,
      growth,
      balance
    })
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
    // console.log('positions', positions)

    const orders = await connection.getOrders()

    const date = new Date()
    const firstDay = new Date(date.getFullYear(), date.getMonth() - 1, 1)
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0)

    const history = await connection.getHistoryOrdersByTimeRange(firstDay.toISOString().split('.')[0] + 'Z', lastDay.toISOString().split('.')[0] + 'Z')

    const dealsResult = await connection.getDealsByTimeRange(firstDay.toISOString().split('.')[0] + 'Z', lastDay.toISOString().split('.')[0] + 'Z')

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
