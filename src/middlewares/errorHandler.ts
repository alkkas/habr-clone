import { NextFunction, Request, Response } from 'express'

const handleUnknownError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err.message)
  res.status(500).json({ message: 'Unknown error', stack: err.stack })
}

export default handleUnknownError
