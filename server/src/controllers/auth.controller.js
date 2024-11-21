class AuthController {
  async login(req, res, next) {
    try {
      res
        .status(200)
        .json({ success: true, message: 'Login success', data: {} })
    } catch (error) {
      next(error)
    }
  }

  async register(req, res, next) {
    try {
      const data = await authService.register(req)
      return res.status(200).json({
        success: true,
        message: 'Register success',
        data
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = AuthController
