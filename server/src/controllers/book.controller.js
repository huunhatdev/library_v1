const { bookService } = require('../services')

class BookController {
  async getBooks(req, res, next) {
    try {
      const data = await bookService.getBooks(req)
      return res
        .status(200)
        .json({ success: true, message: 'Books fetched successfully', data })
    } catch (error) {
      next(error)
    }
  }

  async getBookById(req, res, next) {
    try {
      const data = await bookService.getBookById(req)
      return res
        .status(200)
        .json({ success: true, message: 'Book fetched successfully', data })
    } catch (error) {
      next(error)
    }
  }

  async createBook(req, res, next) {
    try {
      const data = await bookService.createBook(req)
      return res
        .status(200)
        .json({ success: true, message: 'Book created successfully', data })
    } catch (error) {
      next(error)
    }
  }

  async updateBook(req, res, next) {
    try {
      const data = await bookService.updateBook(req)
      return res
        .status(200)
        .json({ success: true, message: 'Book updated successfully', data })
    } catch (error) {
      next(error)
    }
  }

  async deleteBook(req, res, next) {
    try {
      const data = await bookService.deleteBook(req)
      return res
        .status(200)
        .json({ success: true, message: 'Book deleted successfully', data })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = BookController
