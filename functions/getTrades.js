/**
 * Get current user and fetch data from firestore
 */

// platforms

const MYFXBOOK = 'myfxbook'
// TODO: add more platforms

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

    const userDoc = await firestore.collection('credentials').doc(uid).get()

    if (!userDoc.exists) {
      response.status(404).json({
        message: 'User data not found.'
      })
      return
    }

    const userData = userDoc.data()

    switch (platform) {
      case MYFXBOOK:
        // TODO: get myfxbook data function
        break

      default:
        break
    }
    response.status(200).json(userData)
  } catch (error) {
    console.error('Error:', error)
    response.status(403).json({
      message: 'Unauthorized',
      error: error.message
    })
  }
}
