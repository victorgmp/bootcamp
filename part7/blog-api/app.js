const config = require('./utils/config')
const cors = require('cors')
const express = require('express')
require('express-async-errors')
const morgan = require('morgan')

const logger = require('./utils/logger')
const { requestLogger, notFoundHandler, errorHandler, tokenExtractor } = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
// const commentsRouter = require('./controllers/comments')

const app = express()

logger.info('connecting to', config.MONGODB_URI)
require('./utils/db')

app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))
// app.use(requestLogger)
app.use(tokenExtractor)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
// app.use('/api/comments', commentsRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.use(notFoundHandler)
app.use(errorHandler)

module.exports = app
