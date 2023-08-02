import { Request, Response } from 'express'
import promMid from 'express-prometheus-middleware'

export const getMetrics = (req: Request, res: Response) => {
  res.set(promMid({ collectDefaultMetrics: true }))
}
