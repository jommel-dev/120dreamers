/**
 * Computes the total profit per date from a list of positions.
 * @param {Array} positions - An array of position objects.
 * @returns {Object} An object containing total profits per date and the base amount.
 */
exports.getTotalProfitByDate = function (positions) {
  const timestamp = {}
  let baseAmount = 0
  positions.forEach(pos => {
    const date = new Date(pos.time).toDateString()
    if (!timestamp[date]) {
      timestamp[date] = {
        profits: [pos.profit],
        count: 1,
        trades: [pos]
      }
    } else {
      timestamp[date].profits.push(pos.profit)
      timestamp[date].count += 1
      timestamp[date].trades.push(pos)
    }

    if (pos.type === 'DEAL_TYPE_BALANCE') {
      baseAmount = pos.profit
    }
  })
  const totalProfitPerDate = Object.keys(timestamp).map(date => {
    const total = timestamp[date].profits.reduce((a, b) => a + b, 0)
    return {
      time: date,
      profit: total,
      dataCount: timestamp[date].count,
      trades: timestamp[date].trades
    }
  })
  return {
    data: totalProfitPerDate,
    baseAmount
  }
}

/**
 * Validates the provided ID token to ensure the user is authorized.
 * @param {string} idToken - The ID token to validate.
 * @param {Object} admin - Firebase admin instance.
 * @returns {string} Returns the UID of the authenticated user.
 * @throws Will throw an error if the authorization header is not provided or user data is not found.
 */
exports.validateAuthorization = async function (idToken, admin) {
  if (!idToken) {
    throw new Error('Authorization header not provided.')
  }
  const decodedToken = await admin.auth().verifyIdToken(idToken)
  if (!decodedToken) {
    throw new Error('User data not found.')
  }
  return decodedToken.uid
}

/**
 * Retrieves platform data for a given user from Firestore.
 * @param {string} uid - The user's UID.
 * @param {Object} firestore - Firestore instance.
 * @param {string} platformId - The platform ID to retrieve data for.
 * @returns {Object} Returns the platform data for the user.
 * @throws Will throw an error if platform data is not found or essential parameters are missing.
 */
exports.getPlatformData = async function (uid, firestore, platformId) {
  const brokerRef = firestore.doc(`platforms/${uid}/brokers/${platformId}`)

  const brokerSnapshot = await brokerRef.get()

  if (!brokerSnapshot.exists) {
    throw new Error('Platform data not found.')
  }

  const userPlatformData = brokerSnapshot.data()

  if (!userPlatformData.token || !userPlatformData.accountId) {
    throw new Error('Missing params from your platform data.')
  }

  return userPlatformData
}

exports.fetchTradesFromFirestore = async function (uid, firestore) {
  const tradesRef = firestore.collection(`platforms/${uid}/trades`)
  const snapshot = await tradesRef.get()

  const trades = []
  snapshot.forEach(doc => trades.push(doc.data()))

  return trades
}

exports.formatFirebaseTimestamp = function (timestamp) {
  // Convert the Firebase Timestamp to a JavaScript Date object
  const date = timestamp.toDate()

  // Format the Date object to the desired string format
  const formattedDate = date.toISOString()

  return formattedDate
}
