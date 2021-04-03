const { Schema, model } = require('mongoose')

const contactSchema = new Schema({
  name: {
    type: String,
    minlength: 2,
    required: true
  },
  number: {
    type: String,
    required: true,
    minlength: 4
  }
})

contactSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Contact = model('Contact', contactSchema)

module.exports = Contact
