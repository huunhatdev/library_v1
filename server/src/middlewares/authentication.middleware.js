import jwt from 'jsonwebtoken'

import { CustomError } from '../configs/error.js'

import { ROLE_USER } from '@/constants/user.js'
import { userModel } from '@/models/user.model.js'

export class Authentication {
  async verify(req, res, next) {
    try {
      const bearerHeader = req.headers['authorization']

      if (!bearerHeader) {
        throw new CustomError(401, 'Không có token')
      }
      const token = bearerHeader.replace('Bearer ', '')
      jwt.verify(token, process.env.SECRET_JWT, (err, decoded) => {
        if (err) {
          throw new CustomError(401, 'Token không đúng')
        }
        req.user = {
          userId: decoded.id,
          role: decoded.role,
          agentId: decoded.agentId,
          isSuper: decoded.role === ROLE_USER.SUPER
        }
        next()
      })
    } catch (err) {
      next(err)
    }
  }
}
