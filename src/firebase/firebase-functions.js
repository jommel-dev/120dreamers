import { auth } from './index'
import { LocalStorage } from 'quasar'

const fetchData = async (endpoint, method, params = {}) => {
  try {
    // const platform = 'MetaTrader4' // TODO: add more platforms
    // const savedBrokerId = LocalStorage.getItem('selectedBrokerId')

    const user = LocalStorage.getItem('user')
    const authToken = await auth.currentUser?.getIdToken() ?? user?.stsTokenManager?.accessToken

    const response = await fetch(`${process.env.BASE_URL}/${endpoint}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: authToken
      },
      ...(method === 'POST' && { body: JSON.stringify(params) })
    })

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error)
    throw error
  }
}

const postFetchData = async (payload) => {
  try {
    // const platform = 'MetaTrader4' // TODO: add more platforms
    // const savedBrokerId = LocalStorage.getItem('selectedBrokerId')
    console.log(payload, 'Expected to the payload req. params')

    const user = LocalStorage.getItem('user')
    const authToken = await auth.currentUser?.getIdToken() ?? user?.stsTokenManager?.accessToken

    const response = await fetch(`${process.env.BASE_URL}/${payload.endpoint}`, {
      method: 'POST',
      body: JSON.stringify(payload.params),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        Authorization: authToken
      }
    })

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error(`Error fetching ${payload.endpoint}:`, error)
    throw error
  }
}

// Old and Only GET request
export const getTrades = async (params) => {
  return fetchData('getTrades', 'POST', params)
}

export const getCalendar = async (params) => {
  return fetchData('getCalendar', 'POST', params)
}

// New on POST Request
export const syncGetData = async (payload) => {
  console.log(payload)
  return postFetchData(payload)
}
