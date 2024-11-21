const { default: mongooseAutoPopulate } = require('mongoose-autopopulate')

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

categorySchema.plugin(mongooseAutoPopulate)

module.exports = mongoose.model('Category', categorySchema)
