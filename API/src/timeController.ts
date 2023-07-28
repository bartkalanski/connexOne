import { Request, Response } from 'express'

// Function to get the current time in epoch seconds
const getCurrentTime = (): number => {
  return Math.floor(Date.now() / 1000)
}

// Controller for /time endpoint
export const getTime = (req: Request, res: Response): void => {
  const epochTime = getCurrentTime()
  res.json({ epoch: epochTime })
}
