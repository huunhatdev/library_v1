const { categoryService } = require('../services')

class CategoryController {
  async getCategories(req, res, next) {
    try {
      const data = await categoryService.getCategories(req)
      return res.status(200).json({
        success: true,
        message: 'Categories fetched successfully',
        data
      })
    } catch (error) {
      next(error)
    }
  }

  async getUserById(req, res, next) {
    try {
      const data = await categoryService.getCategoryById(req)
      return res
        .status(200)
        .json({ success: true, message: 'Category fetched successfully', data })
    } catch (error) {
      next(error)
    }
  }

  async createUser(req, res, next) {
    try {
      const data = await categoryService.createCategory(req)
      return res
        .status(200)
        .json({ success: true, message: 'Category created successfully', data })
    } catch (error) {
      next(error)
    }
  }

  async updateUser(req, res, next) {
    try {
      const data = await categoryService.updateCategory(req)
      return res
        .status(200)
        .json({ success: true, message: 'Category updated successfully', data })
    } catch (error) {
      next(error)
    }
  }

  async deleteUser(req, res, next) {
    try {
      const data = await categoryService.deleteCategory(req)
      return res
        .status(200)
        .json({ success: true, message: 'Category deleted successfully', data })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = CategoryController
