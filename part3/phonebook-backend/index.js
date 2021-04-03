require('dotenv').config()
require('./db')

const cors = require('cors')
const express = require('express')
const morgan = require('morgan')

const Contact = require('./models/Contact')
const handleErrors = require('./middlewares/handleErrors')
const notFound = require('./middlewares/notFound')

const app = express()

app.use(cors())
app.use(express.json())
// app.use(morgan('tiny'))

app.use(express.static('build'))

morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body - :req[content-length]'))

const contacts = []

// root
app.get('/', (req, res) => {
  res.send('<h1>Hello Wolrd!</h1>')
})

// info
app.get('/info', (req, res) => {
  const ContactsCount = contacts.length
  const message = `
    <p>Phonebook has info for ${ContactsCount} people</p>
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
app.get('/api/contacts/:id', (req, res, next) => {
  const id = req.params.id
  Contact.findById(id)
    .then(contact => {
      if (contact) {
        res.json(contact)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})

// delete by id
app.delete('/api/contacts/:id', (req, res, next) => {
  const { id } = req.params

  Contact.findByIdAndRemove(id)
    .then(() => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

// add
app.post('/api/contacts', (req, res, next) => {
  const { body } = req

  const contact = new Contact({
    name: body.name,
    number: body.number
  })

  contact
    .save()
    .then(savedContact => savedContact.toJSON())
    .then(savedAndFormattedContact => {
      res.json(savedAndFormattedContact)
    })
    .catch(error => next(error))
})

// update by id
app.put('/api/contacts/:id', (req, res, next) => {
  const { body } = req
  const { id } = req.params

  const contact = {
    name: body.name,
    number: body.number
  }

  Contact.findByIdAndUpdate(id, contact, { new: true })
    .then(updatedContact => {
      res.json(updatedContact)
    })
    .catch(error => next(error))
})

app.use(notFound)
app.use(handleErrors)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
