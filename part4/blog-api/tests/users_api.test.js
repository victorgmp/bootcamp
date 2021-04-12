const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const { api, initialUsers, usersInDb } = require('./test_helper')
const User = require('../models/User')

beforeEach(async () => {
  await User.deleteMany({})

  for (let user of initialUsers) {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(user.password, saltRounds)

    const userObject = new User({
      username: user.username,
      name: user.name,
      passwordHash
    })
    await userObject.save()
  }
})

describe('post users', () => {
  test('add new user', async () => {
    const newUser =   {
      'username': 'userfour',
      'name': 'User Four',
      'password': 'megapass'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await usersInDb()
    const usernames = response.map(u => u.username)

    expect(response).toHaveLength(initialUsers.length + 1)
    expect(usernames).toContain('userfour')
  })

  test('add new user without username', async () => {
    const newUser =   {
      'name': 'User Four',
      'password': 'megapass'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const response = await usersInDb()
    expect(response).toHaveLength(initialUsers.length)
  })

  test('add new user without name', async () => {
    const newUser =   {
      'username': 'userfive',
      'password': 'megapass'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const response = await usersInDb()
    expect(response).toHaveLength(initialUsers.length)
  })

  test('add new user without password', async () => {
    const newUser =   {
      'username': 'userfour',
      'name': 'User Four',
    }

    const { body } = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    expect(body).toEqual({ error: 'password is too short or missing' })

    const response = await usersInDb()
    expect(response).toHaveLength(initialUsers.length)
  })

  test('add new user with invalid password', async () => {
    const newUser =   {
      'username': 'userfour',
      'name': 'User Four',
      'password': 'mega'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    expect(result.body).toEqual({ error: 'password is too short or missing' })

    const response = await usersInDb()
    expect(response).toHaveLength(initialUsers.length)
  })
})

describe('get users', () => {
  test('users are returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all users are returned', async () => {
    const response = await api.get('/api/users')

    expect(response.body).toHaveLength(initialUsers.length)
  })
})


afterAll(() => {
  mongoose.connection.close()
})