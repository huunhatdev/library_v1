const { recordService } = require('../services')

class RecordController {
  async getRecords(req, res, next) {
    try {
      const data = await recordService.getRecords(req)
      return res.status(200).json({
        success: true,
        message: 'Records fetched successfully',
        data
      })
    } catch (error) {
      next(error)
    }
  }

  async getRecordById(req, res, next) {
    try {
      const data = await recordService.getRecordById(req)
      return res
        .status(200)
        .json({ success: true, message: 'Record fetched successfully', data })
    } catch (error) {
      next(error)
    }
  }

  async createUser(req, res, next) {
    try {
      const data = await recordService.createRecord(req)
      return res
        .status(200)
        .json({ success: true, message: 'Record created successfully', data })
    } catch (error) {
      next(error)
    }
  }

  async updateUser(req, res, next) {
    try {
      const data = await recordService.updateRecord(req)
      return res
        .status(200)
        .json({ success: true, message: 'Record updated successfully', data })
    } catch (error) {
      next(error)
    }
  }

  async deleteUser(req, res, next) {
    try {
      const data = await recordService.deleteRecord(req)
      return res
        .status(200)
        .json({ success: true, message: 'Record deleted successfully', data })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = RecordController
