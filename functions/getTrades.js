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

    return {
      accountInformation,
      positions,
      orders
    }
  } catch (e) {
    console.log(e)
  }
}
