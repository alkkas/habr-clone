import { User } from '@models/models'
import { NextFunction, Response, Request } from 'express'

const checkValidNameAndEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findOne({ where: { userName: req.body.userName } })
    if (user) {
      return res.status(400).send({
        message: 'Failed! Username is already in use!',
      })
    }

    const email = await User.findOne({ where: { email: req.body.email } })
    if (email) {
      return res.status(400).send({
        message: 'Failed! Email is already in use!',
      })
    }

    next()
  } catch (e) {
    console.log(e)
    return res
      .status(500)
      .send({ message: 'Unable to validate user registration' })
  }
}

export default checkValidNameAndEmail
