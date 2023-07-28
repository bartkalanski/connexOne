import { Request, Response } from 'express'
import promMid from 'express-prometheus-middleware'

// Function to get the metrics data in Prometheus format
export const getMetrics = (req: Request, res: Response) => {
  // In this implementation, you can return a sample response for demonstration purposes.
  const metricsData = `
      # HELP api_requests_total Total API requests
      # TYPE api_requests_total counter
      api_requests_total{method="GET"} 42
    `
  res.set(promMid({ collectDefaultMetrics: true }))
  res.send(metricsData)
}
