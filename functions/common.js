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
