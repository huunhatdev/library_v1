const { roleService } = require('../services')

class RoleController {
  async getRoles(req, res, next) {
    try {
      const data = await roleService.getRoles(req)
      return res
        .status(200)
        .json({ success: true, message: 'Roles fetched successfully', data })
    } catch (error) {
      next(error)
    }
  }

  async getRoleById(req, res, next) {
    try {
      const data = await roleService.getRoleById(req)
      return res
        .status(200)
        .json({ success: true, message: 'Role fetched successfully', data })
    } catch (error) {
      next(error)
    }
  }

  async createRole(req, res, next) {
    try {
      const data = await roleService.createRole(req)
      return res
        .status(200)
        .json({ success: true, message: 'Role created successfully', data })
    } catch (error) {
      next(error)
    }
  }

  async updateRole(req, res, next) {
    try {
      const data = await roleService.updateRole(req)
      return res
        .status(200)
        .json({ success: true, message: 'Role updated successfully', data })
    } catch (error) {
      next(error)
    }
  }

  async deleteRole(req, res, next) {
    try {
      const data = await roleService.deleteRole(req)
      return res
        .status(200)
        .json({ success: true, message: 'Role deleted successfully', data })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = RoleController
