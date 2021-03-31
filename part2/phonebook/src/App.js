import React, { useState, useEffect } from 'react'

import personService from './services/persons'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const initialValues = {
    name: '',
    number: ''
  }

  const [persons, setPersons] = useState([])
  const [values, setValues] = useState(initialValues)
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(personsList => {
        setPersons(personsList)
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

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().indexOf(filter.toLowerCase()) > -1
  );

  const handleMessage = (message) => {
    return window.confirm(message)
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    const newPerson = {
      name: values.name,
      number: values.number
    }
    const nameExist = persons.find(person => person.name === values.name)

    if (nameExist) {
      const message = `${values.name} is already added to phonebook, replace the old number with a new one?`
      const result = handleMessage(message)

      if (result) {
        const previousPerson = persons.find(n => n.name === values.name);

        personService
          .update(previousPerson.id, newPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person =>
              person.id !== previousPerson.id ?  person : returnedPerson
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

      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons([
            ...persons,
            returnedPerson
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
      personService
        .remove(id)
        .then(returnedPerson => {
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>

      <Notification message={message} />

      <Filter filter={filter} onChange={(e) => setFilter(e.target.value)} />

      <h2>Add a new</h2>
      <PersonForm
        values={values}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />

      <h2>Numbers</h2>
      <Persons
        persons={personsToShow}
        handleDelete={(id, name) => handleDelete(id, name)}
      />
    </div>
  )
}

export default App