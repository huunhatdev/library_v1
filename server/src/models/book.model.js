const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    categories: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Category',
      required: true,
      autopopulate: true
    },
    publishedYear: {
      type: Number,
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      default: 0
    },
    availableQuantity: {
      type: Number,
      required: true,
      default: 0
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Book', bookSchema)
