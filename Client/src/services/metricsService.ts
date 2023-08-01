import axios, { AxiosResponse } from 'axios'

const headers = {
  Authorization: process.env.NEXT_PUBLIC_AUTH_TOKEN,
}

const fetchMetrics = async () => {
  try {
    const { data } = await axios.get<unknown, AxiosResponse<string>>(
      `${process.env.NEXT_PUBLIC_BASE_URL}/metrics`,
      {
        headers,
      }
    )
    return data
  } catch (e) {
    console.error(e)
    return Promise.reject(e)
  }
}

export { fetchMetrics }
