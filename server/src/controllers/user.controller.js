const { userService } = require('../services')

class UserController {
  async getUsers(req, res, next) {
    try {
      const data = await userService.getUsers(req)
      return res
        .status(200)
        .json({ success: true, message: 'Users fetched successfully', data })
    } catch (error) {
      next(error)
    }
  }

  async getUserById(req, res, next) {
    try {
      const data = await userService.getUserById(req)
      return res
        .status(200)
        .json({ success: true, message: 'User fetched successfully', data })
    } catch (error) {
      next(error)
    }
  }

  async createUser(req, res, next) {
    try {
      const data = await userService.createUser(req)
      return res
        .status(200)
        .json({ success: true, message: 'User created successfully', data })
    } catch (error) {
      next(error)
    }
  }

  async updateUser(req, res, next) {
    try {
      const data = await userService.updateUser(req)
      return res
        .status(200)
        .json({ success: true, message: 'User updated successfully', data })
    } catch (error) {
      next(error)
    }
  }

  async deleteUser(req, res, next) {
    try {
      const data = await userService.deleteUser(req)
      return res
        .status(200)
        .json({ success: true, message: 'User deleted successfully', data })
    } catch (error) {
      next(error)
    }
  }

  async changePassword(req, res, next) {
    try {
      const data = await userService.changePassword(req)
      return res
        .status(200)
        .json({ success: true, message: 'Password changed successfully', data })
    } catch (error) {
      next(error)
    }
  }

  async getProfile(req, res, next) {
    try {
      const data = await userService.getProfile(req)
      return res
        .status(200)
        .json({ success: true, message: 'Profile fetched successfully', data })
    } catch (error) {
      next(error)
    }
  }

  async updateProfile(req, res, next) {
    try {
      const { email, fullName } = req.body
      const data = await userService.updateUser({
        params: { id: req.user.id },
        body: { email, fullName }
      })
      return res
        .status(200)
        .json({ success: true, message: 'Profile updated successfully', data })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = UserController
