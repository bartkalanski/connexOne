import { fetchTime } from '@/services/timeService'
import React, { useEffect, useState } from 'react'
import styles from '@/styles/Time.module.css'

export default function Time() {
  const [timeData, setTimeData] = useState<number | undefined>(undefined)
  const [timeDifference, setTimeDifference] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const getTimeData = async () => {
      try {
        setIsLoading(true)
        const response = await fetchTime()
        console.log(`time response`, response)
        setTimeData(response?.epoch) // Assuming your API response data is in the 'data' property
      } catch (error) {
        // Handle errors here
        console.error('Error fetching time data:', error)
      } finally {
        setIsLoading(false)
      }
    }
    getTimeData()

    const interval = setInterval(getTimeData, 30000)

    // Cleanup the interval when the component unmounts
    return () => clearInterval(interval)
  }, [])
  console.log(`timeData`, timeData)

  // Update the time difference every second
  useEffect(() => {
    const interval = setInterval(() => {
      const clientTimeInSeconds = Math.floor(Date.now() / 1000)
      setTimeDifference(clientTimeInSeconds - (timeData ?? 0))
    }, 1000)

    return () => clearInterval(interval)
  }, [timeData])

  // Function to format seconds into HH:mm:ss format
  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = seconds % 60

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
      2,
      '0'
    )}:${String(remainingSeconds).padStart(2, '0')}`
  }

  if (isLoading) {
    return <div>Loading</div>
  }

  if (!timeData) {
    return <div>No time data found.</div>
  }

  return (
    <div className={styles.container}>
      <div>Server Time (epoch seconds): {timeData}</div>
      <div>Time Difference: {formatTime(timeDifference)}</div>
    </div>
  )
}
