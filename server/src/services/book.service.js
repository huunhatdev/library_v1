const { bookRepository } = require('../repositories')

class BookService {
  constructor() {
    this.bookRepository = bookRepository
  }

  async getBooks({ query }) {
    return this.bookRepository.findAll(query)
  }

  async getBookById({ params }) {
    return this.bookRepository.findById(params.id)
  }

  async createBook({ body }) {
    return this.bookRepository.create(body)
  }

  async updateBook({ params, body }) {
    return this.bookRepository.update(body, { where: { id: params.id } })
  }

  async deleteBook({ params }) {
    return this.bookRepository.delete(params.id)
  }
}

module.exports = BookService
