import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

const authJWT = (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers.authorization
  if (token) {
    token = token.split(' ').at(-1) as string
    jwt.verify(token, process.env.TOKEN_SECRET as string, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized access.' })
      }
      req.body.decoded = decoded
      next()
    })
  } else {
    return res.status(403).send({
      message: 'No token provided.',
    })
  }
}

export default authJWT
