import React, { useState, useEffect } from 'react'

import contactService from './services/contacts'

import Filter from './components/Filter'
import ContactForm from './components/ContactForm'
import Contacts from './components/Contacts'
import Notification from './components/Notification'

const App = () => {
  const initialValues = {
    name: '',
    number: ''
  }

  const [contacts, setContacts] = useState([])
  const [values, setValues] = useState(initialValues)
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    contactService
      .getAll()
      .then(contactsList => {
        setContacts(contactsList)
      }).catch(error => {
        console.log('error trying to get users', error)
      })
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    })
  }

  const contactsToShow = contacts.filter(contact =>
    contact.name.toLowerCase().indexOf(filter.toLowerCase()) > -1
  );

  const handleMessage = (message) => {
    return window.confirm(message)
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    const newContact = {
      name: values.name,
      number: values.number
    }
    const nameExist = contacts.find(contact => contact.name === values.name)

    if (nameExist) {
      const message = `${values.name} is already added to phonebook, replace the old number with a new one?`
      const result = handleMessage(message)

      if (result) {
        const previousContact = contacts.find(n => n.name === values.name);

        contactService
          .update(previousContact.id, newContact)
          .then(returnedContact => {
            setContacts(contacts.map(contact =>
              contact.id !== previousContact.id ?  contact : returnedContact
            ))

            setMessage({
              content: `Updated ${values.name}`,
              type: 'success'
            })
          }).catch(error => {
            console.log('error trying to update user', error)
            setMessage({
              content: `Information of ${values.name} has already been removed from server`,
              type: 'error'
            })
          })
      }
    } else {

      contactService
        .create(newContact)
        .then(returnedContact => {
          setContacts([
            ...contacts,
            returnedContact
          ])

          setMessage({
            content: `Added ${values.name}`,
            type: 'success'
          })
        }).catch(error => {
          console.log('error trying to create user', error)
        })
    }
  }
  
  const handleDelete = (id, name) => {
    // console.log('id', id)
    const message = `do you really want to eliminate ${name}?`
    const result = handleMessage(message)

    if (result) {
      contactService
        .remove(id)
        .then(returnedContact => {
          setContacts(contacts.filter(contact => contact.id !== id))
        })
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>

      <Notification message={message} />

      <Filter filter={filter} onChange={(e) => setFilter(e.target.value)} />

      <h2>Add a new</h2>
      <ContactForm
        values={values}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />

      <h2>Numbers</h2>
      <Contacts
        contacts={contactsToShow}
        handleDelete={(id, name) => handleDelete(id, name)}
      />
    </div>
  )
}

export default App