require('dotenv').config()

const PORT = process.env.PORT || 3004
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/bloglist'

module.exports = {
  MONGODB_URI,
  PORT
}