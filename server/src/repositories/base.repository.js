class BaseRepository {
  constructor(model) {
    this.model = model
  }

  async create(data) {
    return await this.model.create(data)
  }

  async findById(id) {
    return await this.model.findById(id)
  }

  async findOne(query) {
    return await this.model.findOne(query)
  }

  async find(query) {
    return await this.model.find(query)
  }

  async findOneAndUpdate(query, data) {
    return await this.model.findOneAndUpdate(query, data)
  }

  async update(query, data) {
    return await this.model.updateOne(query, data)
  }

  async updateMany(query, data) {
    return await this.model.updateMany(query, data)
  }

  async delete(query) {
    return await this.model.deleteOne(query)
  }
}

module.exports = BaseRepository
