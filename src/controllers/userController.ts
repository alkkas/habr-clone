import { Response, Request } from 'express'
import { User } from '@models/models'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import getTokens from '../utils/getTokens'

class UserController {
  async registration(req: Request, res: Response) {
    try {
      const user = User.create({
        userName: req.body.userName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
      })
      const userData = {
        userName: req.body.userName,
        email: req.body.email,
      }
      const [token, refreshToken] = getTokens(userData)

      const response = {
        status: 'logged In',
        token,
        refreshToken,
      }
      res.status(200).json(response)
    } catch (e) {
      console.log(e)
      res.status(500).json({ message: 'error while registering user' })
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
    const [token, refreshToken] = getTokens({ is: user.id })
    const response = {
      status: 'logged In',
      token,
      refreshToken,
    }
    res.status(200).json(response)
  }
  async auth(req: Request, res: Response) {
    let token = req.headers['Authorization']

    if (token && !(token instanceof Array)) {
      token = token.split(' ').at(-1) as string
      jwt.verify(token, process.env.TOKEN_SECRET as string, (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: 'Unauthorized access.' })
        }
        return res.status(200).json({ decoded })
      })
    }

    return res.status(403).send({
      message: 'No token provided.',
    })
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
