import jwt from 'jsonwebtoken'

import { CustomError } from '../configs/error.js'

export class Authentication {
  async verify(req, res, next) {
    try {
      const bearerHeader = req.headers['authorization']

      if (!bearerHeader) {
        throw new CustomError(401, 'Missing token')
      }
      const token = bearerHeader.replace('Bearer ', '')
      jwt.verify(token, process.env.SECRET_JWT, (err, decoded) => {
        if (err) {
          throw new CustomError(401, 'Invalid token')
        }
        req.user = decoded
        next()
      })
    } catch (err) {
      next(err)
    }
  }
}
