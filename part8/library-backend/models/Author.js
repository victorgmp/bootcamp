const { Schema, model } = require('mongoose')

const authorSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 4
  },
  born: {
    type: Number
  }
  // books: [{
  //   type: Schema.Types.ObjectId,
  //   ref: 'Book'
  // }],
})

// authorSchema.set('toJSON', {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString()
//     delete returnedObject._id
//     delete returnedObject.__v
//   }
// })

const Author = model('Author', authorSchema)

module.exports = Author
