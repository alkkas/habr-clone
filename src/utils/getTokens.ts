import jwt from 'jsonwebtoken'

const getTokens = (data: any): [string, string] => {
  const token = jwt.sign(data, process.env.TOKEN_SECRET as string, {
    expiresIn: process.env.TOKEN_LIFE,
  })
  const refreshToken = jwt.sign(data, process.env.REFRESH_SECRET as string, {
    expiresIn: process.env.REFRESH_LIFE,
  })
  return [token, refreshToken]
}

export default getTokens
