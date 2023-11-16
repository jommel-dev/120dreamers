/**
 * Computes the total profit per date from a list of positions.
 * @param {Array} positions - An array of position objects.
 * @returns {Object} An object containing total profits per date and the base amount.
 */
exports.getTotalProfitByDate = function (positions) {
  // Create an object to store profit data per date
  const timestamp = {}
  let baseAmount = 0

  // Iterate through the positions
  positions.forEach(pos => {
    const date = new Date(pos.time).toDateString()
    if (!timestamp[date]) {
      // Initialize data for the date if it doesn't exist
      timestamp[date] = {
        profits: [pos.profit],
        count: 1,
        trades: [pos]
      }
    } else {
      // Update data for the existing date
      timestamp[date].profits.push(pos.profit)
      timestamp[date].count += 1
      timestamp[date].trades.push(pos)
    }

    // Update base amount if the position type is 'DEAL_TYPE_BALANCE'
    if (pos.type === 'DEAL_TYPE_BALANCE') {
      baseAmount = pos.profit
    }
  })

  // Calculate total profit per date and format the result
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
  // Verify and decode the ID token using Firebase admin
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
  // Create a reference to the user's platform data in Firestore
  const brokerRef = firestore.doc(`platforms/${uid}/brokers/${platformId}`)

  // Retrieve the platform data
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

/**
 * Fetches trades data for a given user from Firestore.
 * @param {string} uid - The user's UID.
 * @param {Object} firestore - Firestore instance.
 * @returns {Array} Returns an array of trade objects.
 */
exports.fetchTradesFromFirestore = async function (uid, firestore) {
  // Create a reference to the user's trades collection in Firestore
  const tradesRef = firestore.collection(`platforms/${uid}/trades`)

  // Retrieve the trade data
  const snapshot = await tradesRef.get()

  const trades = []
  snapshot.forEach(doc => trades.push(doc.data()))

  return trades
}

/**
 * Formats a Firebase Timestamp to a JavaScript Date object.
 * @param {Object} timestamp - The Firebase Timestamp to format.
 * @returns {string} Returns the formatted date as an ISO string.
 */
exports.formatFirebaseTimestamp = function (timestamp) {
  // Convert the Firebase Timestamp to a JavaScript Date object
  const date = timestamp.toDate()

  // Format the Date object to the desired string format (ISO string)
  const formattedDate = date.toISOString()
  return formattedDate
}
