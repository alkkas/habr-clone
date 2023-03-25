import { User } from '@models/models'
import bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import getTokens from '../utils/getTokens'

class UserController {
  async registration(req: Request, res: Response) {
    try {
      const user = await User.create({
        userName: req.body.userName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
      })
      const userData = {
        userName: req.body.userName,
        email: req.body.email,
        id: user.id,
      }
      const [token, refreshToken] = getTokens(userData)

      const response = {
        status: 'logged In',
        token,
        refreshToken,
      }
      return res.status(200).json(response)
    } catch (e) {
      console.log(e)
      return res.status(500).json({ message: 'error while registering user' })
    }
  }
  async login(req: Request, res: Response) {
    const user = await User.findOne({ where: { email: req.body.email } })
    if (!user) {
      return res.status(404).send({ message: 'User Not found.' })
    }
    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password)
    if (!passwordIsValid) {
      return res.status(401).send({
        message: 'Invalid Password!',
      })
    }
    const [token, refreshToken] = getTokens({
      id: user.id,
      email: req.body.email,
    })
    const response = {
      status: 'logged In',
      token,
      refreshToken,
    }

    res.status(200).json(response)
  }
  async auth(req: Request, res: Response) {
    const decoded = req.body.decoded
    return res.status(200).json({ decoded })
  }
  async refreshToken(req: Request, res: Response) {
    const token: string | undefined = req.body.token
    if (token) {
      jwt.verify(
        token,
        process.env.REFRESH_SECRET as string,
        (err, decoded) => {
          if (err) {
            return res.status(401).json({ message: 'Unauthorized access.' })
          }
          return res.status(200).json({ decoded })
        }
      )
    }
    return res.status(403).send({
      message: 'No refresh token provided.',
    })
  }
}

export default UserController
