import { NextFunction, Request, Response } from 'express'

const handleUnknownError = (
  err: Error,
  _: Request,
  res: Response,
  next: NextFunction
) => {
  return res.status(500).json({ message: 'Unknown error', stack: err.stack })
}

export default handleUnknownError
