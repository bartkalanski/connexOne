import axios, { AxiosResponse } from 'axios'

type Time = {
  epoch: number
}

const headers = {
  Authorization: process.env.NEXT_PUBLIC_AUTH_TOKEN,
}

const fetchTime = async () => {
  try {
    const { data } = await axios.get<unknown, AxiosResponse<Time>>(
      `${process.env.NEXT_PUBLIC_BASE_URL}/time`,
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

export { fetchTime }
