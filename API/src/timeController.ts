import { Request, Response } from 'express'

const getCurrentTime = (): number => {
  return Math.floor(Date.now() / 1000)
}

export const getTime = (req: Request, res: Response): void => {
  const epochTime = getCurrentTime()
  res.json({ epoch: epochTime })
}
