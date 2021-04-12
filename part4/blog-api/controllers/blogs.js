const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/Blog')
const User = require('../models/User')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const { body } = request

  if (body.title === undefined || body.url === undefined) {
    return response.status(400).end()
  }

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const { id } = request.params
  const blog = await Blog.findById(id)

  if (blog && blog.user.toString() === decodedToken.id.toString()) {
    // await Blog.findByIdAndRemove(id)
    await blog.remove()
    response.status(204).end()
  } else {
    response.status(401).end()
  }

})

blogsRouter.put('/:id', async (request, response) => {
  const { body } = request
  const { id } = request.params

  const blog = { likes: body.likes }
  const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true })

  response.json(updatedBlog)
})

module.exports = blogsRouter
