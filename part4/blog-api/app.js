const config = require('./utils/config')
const cors = require('cors')
const express = require('express')
require('express-async-errors')
const morgan = require('morgan')

const logger = require('./utils/logger')
const { requestLogger, notFoundHandler, errorHandler } = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')

const app = express()

logger.info('connecting to', config.MONGODB_URI)
require('./utils/db')

app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))
// app.use(requestLogger)

app.use('/api/blogs', blogsRouter)

app.use(notFoundHandler)
app.use(errorHandler)

module.exports = app
