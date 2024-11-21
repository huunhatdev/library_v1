const { userRepository } = require('../repositories')

class UserService {
  constructor() {
    this.userRepository = userRepository
  }

  async getUsers({ query }) {
    return this.userRepository.findAll(query)
  }

  async getUserById({ params }) {
    return this.userRepository.findById(params.id)
  }

  async createUser({ body }) {
    return this.userRepository.create(body)
  }

  async updateUser({ params, body }) {
    return this.userRepository.findOneAndUpdate({ _id: params.id }, body)
  }

  async deleteUser({ params }) {
    return this.userRepository.delete(params.id)
  }
}

module.exports = UserService
