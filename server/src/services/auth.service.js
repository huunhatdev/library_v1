const { userRepository } = require('../repositories')
const { CustomError } = require('../utils/error.util')

class AuthService {
  constructor() {
    this.userRepository = userRepository
  }

  async login({ body }) {
    const { email, password } = body
    const user = await this.userRepository.findByEmail(email)
    if (!user) {
      throw new CustomError(400, 'User not found')
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
  }

  async register(data) {
    return data
  }
}

module.exports = AuthService
