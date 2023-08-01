import express, { Request, Response, NextFunction } from 'express'
import promMid from 'express-prometheus-middleware'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 3009

// Middleware to check for Authorization header
const checkAuthorization = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authToken = req.header('Authorization')
  if (authToken !== 'mysecrettoken') {
    return res.status(403).json({ error: 'Unauthorized' })
  }
  next()
}

app.use(cors())

// Middleware to add Prometheus metrics
app.use(
  promMid({
    metricsPath: '/metrics',
    collectDefaultMetrics: true,
  })
)

// Import the controllers
import { getTime } from './timeController'
import { getMetrics } from './metricsController'

// Routes
app.get('/time', checkAuthorization, getTime)
app.get('/metrics', checkAuthorization, getMetrics)

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
