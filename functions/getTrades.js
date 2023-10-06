/**
 * Get current user and fetch data from firestore
 */

// TODO: add more platforms
const MT4 = 'MetaTrader4'

exports.handler = async function (request, response, logger, admin, firestore) {
  try {
    logger.info('Hello logs!', { structuredData: true })

    const idToken = request.headers.authorization

    if (!idToken) {
      response.status(401).json({
        message: 'Authorization header not provided.'
      })
      return
    }

    const platform = request.query.platform

    if (!platform) {
      response.status(401).json({
        message: 'Platform is required.'
      })
      return
    }

    const decodedToken = await admin.auth().verifyIdToken(idToken)
    const uid = decodedToken.uid

    if (!decodedToken) {
      response.status(404).json({
        message: 'User data not found.'
      })
      return
    }

    const brokersRef = firestore.collection(`platforms/${uid}/brokers`)
    const query = brokersRef

    const querySnapshot = await query.get()

    // console.log({ querySnapshot })
    const filteredBrokers = querySnapshot.docs.map(doc => doc.data())

    if (!filteredBrokers.length) {
      response.status(404).json({
        message: 'Platform data not found.'
      })
      return
    }

    const userPlatformData = filteredBrokers[0]
    console.log({ userPlatformData })
    let result = null

    const { token, accountId } = userPlatformData
    if (!token || !accountId) {
      response.status(404).json({
        message: 'Missing params from your platform data.'
      })
      return
    }
    switch (platform) {
      case MT4:
        result = await fetchData(token, accountId)
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

async function getConnectionConnection (token, accountId) {
  const MetaApi = require('metaapi.cloud-sdk').default
  const metaApi = new MetaApi(token)
  const account = await metaApi.metatraderAccountApi.getAccount(accountId)

  await account.waitConnected()
  const connection = account.getRPCConnection()

  await connection.connect()
  await connection.waitSynchronized()

  return connection
}

async function fetchData (token, accountId) {
  try {
    const connection = await getConnectionConnection(token, accountId)

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
    // const growthValues = getGrowthValues(deals)
    // console.log('growthValues', growthValues)

    const profitsByDate = getTotalProfitByDate(deals)

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
      balance: (index === 0 || profit.growth === growth[0].growth) ? profit.growth : parseFloat(growth[0].growth) + parseFloat(profit.growth)
    }))

    return {
      accountInformation,
      positions,
      orders,
      // growthValues,
      history,
      deals,
      profits,
      growth,
      balance
      // deals
    }
  } catch (e) {
    console.log(e)
  }
}

function getTotalProfitByDate (positions) {
  const timestamp = {}
  positions.forEach(pos => {
    const date = new Date(pos.time).toDateString()
    if (!timestamp[date]) {
      timestamp[date] = [pos.profit]
    } else {
      timestamp[date].push(pos.profit)
    }
  })
  const totalProfitPerDate = Object.keys(timestamp).map(date => {
    const total = timestamp[date].reduce((a, b) => a + b, 0)
    return {
      time: date,
      profit: total
    }
  })
  return totalProfitPerDate
}

// function getGrowthValues (_positions) {
//   const timestamps = []
//   const growthPercentages = []
//   const growthValuesWithTimestamps = []

//   const positions = getTotalProfitByDate(_positions)
//   for (let i = 0; i < positions.length; i++) {
//     const dataPoint = positions[i]
//     timestamps.push(dataPoint.time)
//     if (i > 0) {
//       const previousProfit = positions[i - 1].profit
//       const currentProfit = dataPoint.profit
//       const growthPercentage = calculateGrowthPercentage(previousProfit, currentProfit)
//       growthPercentages.push(growthPercentage)
//     } else {
//       growthPercentages.push(0) // First data point, set growth percentage to 0
//     }

//     growthValuesWithTimestamps.push({
//       time: dataPoint.time,
//       growthPercentage: growthPercentages[i]
//     })
//   }

//   return growthValuesWithTimestamps
// }

// function calculateGrowthPercentage (previousProfit, currentProfit) {
//   const growthPercentage = ((currentProfit - previousProfit) / Math.abs(previousProfit)) * 100
//   return growthPercentage.toFixed(3)
// }
