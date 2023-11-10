import { Axios } from 'axios'

export const axios = new Axios({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_API_KEY}`,
  },
})

axios.interceptors.response.use(
  (response) => {
    if (typeof response.data === 'string') {
      try {
        return JSON.parse(response.data)
      } catch (error) {
        console.error(error)
        throw new Error('Invalid JSON response')
      }
    }
    return response.data
  },
  (error) => {
    return Promise.reject(error)
  },
)
