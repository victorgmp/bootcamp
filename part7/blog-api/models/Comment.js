const { Schema, model } = require('mongoose')

const commentSchema = new Schema({
  content: {
    type: String,
    required: true
  }
})

commentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Comment = model('Comment', commentSchema)

module.exports = Comment