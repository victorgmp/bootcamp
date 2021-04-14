const { Schema, model } = require('mongoose')

const blogSchema = new Schema({
  title: {
    type: String,
    minlength: 4,
    required: true
  },
  author: String,
  url: {
    type: String,
    minlength: 8,
    required: true
  },
  likes: Number,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Blog = model('Blog', blogSchema)

module.exports = Blog
