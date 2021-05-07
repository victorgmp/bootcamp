const { Schema, model } = require('mongoose')

const author = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 4
  },
  born: {
    type: Number,
  },
})

module.exports = model('Author', author)