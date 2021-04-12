const supertest = require('supertest')

const Blog = require('../models/Blog')
const User = require('../models/User')

const app = require('../app')
const api = supertest(app)


// Users
const initialUsers = [
  {
    username: 'userone',
    name: 'User One',
    password: 'megapass',
    blogs: []
  },
  {
    username: 'usertwo',
    name: 'User Two',
    password: 'megapass',
    blogs: []
  },
  {
    username: 'userthree',
    name: 'User Three',
    password: 'megapass',
    blogs: []
  }

]

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

// Blogs
const initialBlogs = [
  {
    title: 'blog one',
    author: 'author one',
    url: '/api/blogs/1',
    likes: '4'
  },
  {
    title: 'blog two',
    author: 'author two',
    url: '/api/blogs/2',
    likes: '6'
  },
  {
    title: 'blog three',
    author: 'author three',
    url: '/api/blogs/3',
    likes: '2'
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const testLogin = async ({ username, password }) => {
  const result = await api
    .post('/api/login')
    .send({
      username,
      password
    })

  return result.body.token
}

module.exports = {
  api,
  initialBlogs,
  blogsInDb,
  initialUsers,
  usersInDb,
  testLogin
}