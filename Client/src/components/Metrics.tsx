import { fetchMetrics } from '@/services/metricsService'
import React, { useEffect, useState } from 'react'
import styles from '@/styles/Metrics.module.css'

export default function Metrics() {
  const [metricsData, setMetricsData] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const getMetricsData = async () => {
      try {
        setIsLoading(true)
        const response = await fetchMetrics()
        setMetricsData(response)
      } catch (error) {
        console.error('Error fetching metrics data:', error)
      } finally {
        setIsLoading(false)
      }
    }
    getMetricsData()
    const interval = setInterval(getMetricsData, 30000)

    return () => clearInterval(interval)
  }, [])

  if (isLoading) {
    return <div>Loading</div>
  }

  if (!metricsData) {
    return <div>No metrics data found.</div>
  }

  return <div className={styles.container}>{metricsData}</div>
}
