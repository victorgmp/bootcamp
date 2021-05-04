const commentsRouter = require('express').Router()
const Comment = require('../models/Comment')
const Blog = require('../models/Blog')

commentsRouter.get('/', async (request, response) => {
  const comments = await Comment.find({})

  response.json(comments)
})

commentsRouter.post('/', async (request, response) => {
  const { body } = request

  if (body.content === undefined) {
    return response.status(400).end()
  }

  const blog = await Blog.findById(body.blogId)

  const comment = new Comment({
    content: body.content
  })

  const savedComment = await comment.save()
  blog.comments = blog.comments.concat(savedComment._id)
  await blog.save()

  response.status(201).json(savedComment)
})

module.exports = commentsRouter
