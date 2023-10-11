/**
 * Calculates the total profit for each date based on the given positions.
 * @param {Object[]} positions - An array of position objects.
 * @param {string} positions[].time - The timestamp for the position.
 * @param {number} positions[].profit - The profit for the position.
 * @param {number} positions[].dataCount - The number of positions for the date.
 * @returns {Object[]} An array of objects with date and total profit.
 */
exports.getTotalProfitByDate = function (positions) {
  const timestamp = {}
  let baseAmount = 0
  positions.forEach(pos => {
    const date = new Date(pos.time).toDateString()
    if (!timestamp[date]) {
      timestamp[date] = {
        profits: [pos.profit],
        count: 1
      }
    } else {
      timestamp[date].profits.push(pos.profit)
      timestamp[date].count += 1
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
      dataCount: timestamp[date].count
    }
  })
  return {
    data: totalProfitPerDate,
    baseAmount
  }
}

/**
* Validates the authorization token and returns the user's UID.
* Throws an error if the token is not provided or invalid.
* @param {string} idToken - The ID token from the authorization header.
* @param {Object} admin - Firebase admin SDK reference.
* @returns {string} The UID of the authenticated user.
* @throws {Error} Throws an error if the token is missing or invalid.
*/
exports.validateAuthorization = async function (idToken, admin) {
  if (!idToken) {
    throw new Error({ status: 401, message: 'Authorization header not provided.' })
  }
  const decodedToken = await admin.auth().verifyIdToken(idToken)
  if (!decodedToken) {
    throw new Error({ status: 404, message: 'User data not found.' })
  }
  return decodedToken.uid
}

/**
* Retrieves platform data for the specified user.
* @param {string} uid - The UID of the user.
* @param {Object} firestore - Firestore instance.
* @returns {Object} Platform data for the user.
* @throws {Error} Throws an error if platform data is not found.
*/
exports.getPlatformData = async function (uid, firestore) {
  const brokersRef = firestore.collection(`platforms/${uid}/brokers`)
  const querySnapshot = await brokersRef.get()
  const filteredBrokers = querySnapshot.docs.map(doc => doc.data())
  if (!filteredBrokers.length) {
    throw new Error({ status: 404, message: 'Platform data not found.' })
  }
  const userPlatformData = filteredBrokers[0]
  if (!userPlatformData.token || !userPlatformData.accountId) {
    throw new Error({ status: 404, message: 'Missing params from your platform data.' })
  }
  return userPlatformData
}
