const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const { initialBlogs, blogsInDb } = require('./test_helper')
const Blog = require('../models/Blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of initialBlogs) {
    const blogObject = new Blog(blog)
    await blogObject.save()
  }
})

describe('get blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(initialBlogs.length)
  })

  test('every blog have an id', async () => {
    const { body } = await api.get('/api/blogs')

    body.forEach(b => expect(b.id).toBeDefined())
  })
})

describe('post blogs', () => {
  test('add new blog', async () => {
    const newBlog =   {
      title: 'blog four',
      author: 'author four',
      url: '/api/blogs/4',
      likes: '8'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await blogsInDb()
    const titles = response.map(r => r.title)

    expect(response).toHaveLength(initialBlogs.length + 1)
    expect(titles).toContain('blog four')
  })

  test('likes by default zero', async () => {
    const newBlog =   {
      title: 'blog five',
      author: 'author five',
      url: '/api/blogs/5'
    }

    const { body }  = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(body.likes).toBe(0)
  })

  test('blogs without title and url', async () => {
    const newBlog =   {
      author: 'author six',
      likes: '6'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const response = await blogsInDb()
    expect(response).toHaveLength(initialBlogs.length)
  })
})

describe('delete blogs', () => {
  test('delete an existent blog', async () => {
    const blogsAtStart = await blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await blogsInDb()
    expect(blogsAtEnd).toHaveLength(initialBlogs.length - 1)

    const titles = blogsAtEnd.map(r => r.title)
    expect(titles).not.toContain(blogToDelete.title)
  })

  test('delete an non-existent blog', async () => {
    await api
      .delete('/api/blogs/606f19d4a20309eb2a8e246c')
      .expect(204)

    const blogsAtEnd = await blogsInDb()
    expect(blogsAtEnd).toHaveLength(initialBlogs.length)
  })
})

describe('update blogs', () => {
  test('update likes in a blog', async () => {
    const blogsAtStart = await blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const blog = {
      likes: 12
    }

    const { body } = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blog)

    expect(body.likes).toBe(blog.likes)
  })
})


afterAll(() => {
  mongoose.connection.close()
})