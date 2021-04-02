require('dotenv').config()
require('./db')

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const Contact = require('./models/Contact')

const app = express()

app.use(cors())
app.use(express.json())
// app.use(morgan('tiny'))

app.use(express.static('build'))

morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body - :req[content-length]'))

let contacts = []

const generateId = () => {
  const maxId = contacts.length > 0
    ? Math.max(...contacts.map(n => n.id))
    : 0
  return maxId + 1
}

// root
app.get('/', (req, res) => {
  res.send('<h1>Hello Wolrd!</h1>')
})

// info
app.get('/info', (req, res) => {
  const personsCount = contacts.length
  const message = `
    <p>Phonebook has info for ${personsCount} people</p>
    <p>${new Date()}</p>
  `
  res.send(message)
})

// get all
app.get('/api/contacts', (req, res) => {
  Contact.find({}).then(contacts => {
    res.json(contacts)
  })
})

// get by id
app.get('/api/contacts/:id', (req, res) => {
  const id = Number(req.params.id)
  const contact = contacts.find(contact => contact.id === id)

  if (contact) {
    res.json(contact)
  } else {
    res.status(404).send('Contact not found')
  }
})

// delete by id
app.delete('/api/contacts/:id', (req, res) => {
  const id = Number(req.params.id)
  contacts = contacts.filter(contact => contact.id !== id)

  res.status(204).end()
})

// add
app.post('/api/contacts', (req, res) => {
  const { body } = req

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'missing name or phone number'
    })
  }

  const contactsFound = contacts.find(contact => contact.name === body.name)
  if (contactsFound) {
    return res.status(400).json({
      error: 'name must be unique'
    })
  }

  const newPerson = {
    name: body.name,
    number: body.number,
    id: generateId()
  }
  contacts = [...contacts, newPerson]

  res.json(newPerson)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
