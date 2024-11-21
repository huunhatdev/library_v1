const { default: mongooseAutoPopulate } = require('mongoose-autopopulate')

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    fullName: {
      type: String,
      required: true
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role',
      required: true,
      autopopulate: true
    }
  },
  { timestamps: true }
)

userSchema.plugin(mongooseAutoPopulate)
module.exports = mongoose.model('User', userSchema)
