const Blog = require('../models/Blog')
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

module.exports = {
  initialBlogs,
  blogsInDb
}