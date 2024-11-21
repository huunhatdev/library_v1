const { roleRepository } = require('../repositories')

class RoleService {
  constructor() {
    this.roleRepository = roleRepository
  }

  async getRoles({ query }) {
    return this.roleRepository.findAll(query)
  }

  async getRoleById({ params }) {
    return this.roleRepository.findById(params.id)
  }

  async createRole({ body }) {
    return this.roleRepository.create(body)
  }

  async updateRole({ params, body }) {
    return this.roleRepository.update(body, { where: { id: params.id } })
  }

  async deleteRole({ params }) {
    return this.roleRepository.delete(params.id)
  }
}

module.exports = RoleService
