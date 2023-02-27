import { Response, Request } from 'express'
import { User } from '@models/models'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from '../config'

interface tokenListType {
  [i: string]: {
    status: string
    token: string
    refreshToken: string
  }
}
const tokenList: tokenListType = {}

class UserController {
  async registration(req: Request, res: Response) {
    try {
      console.log(req.body)
      const user = User.create({
        userName: req.body.userName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
      })
      const userData = {
        userName: req.body.userName,
        email: req.body.email,
      }
      const token = jwt.sign(userData, config.secret, {
        expiresIn: config.tokenLife,
      })
      const refreshToken = jwt.sign(userData, config.refreshToken, {
        expiresIn: config.refreshTokenLife,
      })
      const response = {
        status: 'logged In',
        token,
        refreshToken,
      }
      tokenList[refreshToken] = response
      res.status(200).json(response)
    } catch (e) {
      console.log(e)
      res.status(500).json({ message: 'error while registering user' })
    }
  }
  async login(req: Request, res: Response) {}
  async auth(req: Request, res: Response) {
    res.json({ msg: 'asdf' })
  }
}

export default UserController
