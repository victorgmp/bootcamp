const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const {
  api,
  initialBlogs,
  blogsInDb,
  initialUsers,
  usersInDb,
  testLogin
} = require('./test_helper')
const Blog = require('../models/Blog')
const User = require('../models/User')

jest.setTimeout(30000)

// beforeEach(async () => {
//   await Blog.deleteMany({})
//   await User.deleteMany({})

//   const blogObjects = helper.initialBlogs
//     .map(blog => new Blog(blog))

//   const promiseArray = blogObjects.map(blog => blog.save())
//   await Promise.all(promiseArray)
// })

beforeEach(async () => {
  await User.deleteMany({})

  let users = []
  for (let user of initialUsers) {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(user.password, saltRounds)

    const userObject = new User({
      username: user.username,
      name: user.name,
      passwordHash
    })
    const savedUser = await userObject.save()
    // users = users.concat(savedUser)
    users = [ ...users, savedUser ]
  }

  await Blog.deleteMany({})

  let index = 0
  for (let blog of initialBlogs) {
    const user = users[index]

    const blogObject = new Blog(blog)
    blogObject.user = user.id

    const savedBlog = await blogObject.save()

    user.blogs = [ ...user.blogs, savedBlog._id ]
    await user.save()
    index ++
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
  test('succeeds with valid data', async () => {
    const newBlog =   {
      title: 'blog four',
      author: 'author four',
      url: '/api/blogs/4',
      likes: '8'
    }

    const token = await testLogin({
      username: initialUsers[0].username,
      password: initialUsers[0].password,
    })

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await blogsInDb()
    const titles = blogsAtEnd.map(r => r.title)

    expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1)
    expect(titles).toContain('blog four')
  })

  test('with likes by default zero', async () => {
    const newBlog =   {
      title: 'blog five',
      author: 'author five',
      url: '/api/blogs/5'
    }

    const token = await testLogin({
      username: initialUsers[0].username,
      password: initialUsers[0].password,
    })

    const { body }  = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(body.likes).toBe(0)
  })

  test('without title and url', async () => {
    const newBlog =   {
      author: 'author six',
      likes: '6'
    }

    const token = await testLogin({
      username: initialUsers[0].username,
      password: initialUsers[0].password,
    })

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)

    const response = await blogsInDb()
    expect(response).toHaveLength(initialBlogs.length)
  })

  test('without token', async () => {
    const newBlog =   {
      title: 'blog seven',
      author: 'author seven',
      url: '/api/blogs/7',
      likes: '8'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)

    const blogsAtEnd = await blogsInDb()

    expect(blogsAtEnd).toHaveLength(initialBlogs.length)
  })
})

describe('delete blogs', () => {
  test('delete an existent blog', async () => {
    const blogsAtStart = await blogsInDb()
    const blogToDelete = blogsAtStart[0]

    const token = await testLogin({
      username: initialUsers[0].username,
      password: initialUsers[0].password,
    })

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await blogsInDb()
    expect(blogsAtEnd).toHaveLength(initialBlogs.length - 1)

    const titles = blogsAtEnd.map(r => r.title)
    expect(titles).not.toContain(blogToDelete.title)
  })

  test('delete an non-existent blog', async () => {
    const token = await testLogin({
      username: initialUsers[0].username,
      password: initialUsers[0].password,
    })

    await api
      .delete('/api/blogs/606f19d4a20309eb2a8e246c')
      .set('Authorization', `Bearer ${token}`)
      .expect(401)

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