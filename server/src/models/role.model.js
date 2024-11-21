const { USER_ROLES, PERMISSIONS_TYPES } = require('../constant')

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: USER_ROLES,
    required: true
  },
  permissions: {
    type: [{ type: String, enum: PERMISSIONS_TYPES }],
    required: true
  }
})

module.exports = mongoose.model('Role', roleSchema)
