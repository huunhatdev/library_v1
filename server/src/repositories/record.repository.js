const recordModel = require('../models/record.model')

class RecordRepository extends BaseRepository {
  constructor() {
    super(recordModel)
  }
}

module.exports = RecordRepository
