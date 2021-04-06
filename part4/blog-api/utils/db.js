const mongoose = require('mongoose')
const logger = require('./logger')

const connectionString = process.env.MONGODB_URI

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
  .then(() => {
    logger.info('database connected')
  })
  .catch((error) => {
    logger.error('error connecting to database:', error.message)
  })
