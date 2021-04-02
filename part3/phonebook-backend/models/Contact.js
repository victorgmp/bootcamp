const { Schema, model } = require('mongoose')

const contactSchema = new Schema({
  name: String,
  number: String
})

contactSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Contact = model('Contact', contactSchema)

module.exports = Contact
