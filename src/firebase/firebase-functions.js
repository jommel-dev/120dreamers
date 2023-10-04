const BASE_URL = 'http://127.0.0.1:5001/dreamers-eb67b/us-central1'
import { auth } from './index'

export const getTrades = async () => {
  try {
    const platform = 'MetaTrader4' // TODO: add more platforms
    const authToken = await auth.currentUser.getIdToken()
    const response = await fetch(`${BASE_URL}/getTrades?platform=${platform}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authToken
      }
    })

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching trades:', error)
    throw error
  }
}
