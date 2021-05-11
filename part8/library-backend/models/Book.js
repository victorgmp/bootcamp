const { Schema, model, SchemaTypes } = require('mongoose')

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: 2
  },
  published: {
    type: Number,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Author'
  },
  genres: [
    { type: String }
  ]
})

// bookSchema.set('toJSON', {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString()
//     delete returnedObject._id
//     delete returnedObject.__v
//   }
// })

const Book = model('Book', bookSchema)

module.exports = Book
