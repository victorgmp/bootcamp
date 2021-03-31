import React, { useState, useEffect } from 'react'

import personService from './services/persons'

import { Filter } from './components/Filter'
import { PersonForm } from './components/PersonForm'
import { Persons } from './components/Persons'

const App = () => {
  const initialValues = {
    name: '',
    number: ''
  }
  const [persons, setPersons] = useState([])
  const [state, setState] = useState(initialValues)
  const [filter, setFilter] = useState('')

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
    setState({
      ...state,
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
      name: state.name,
      number: state.number
    }
    const nameExist = persons.find(person => person.name === state.name)

    if (nameExist) {
      const message = `${state.name} is already added to phonebook, replace the old number with a new one?`
      const result = handleMessage(message)

      if (result) {
        const previousPerson = persons.find(n => n.name === state.name);

        personService
          .update(previousPerson.id, newPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person =>
              person.id !== previousPerson.id ?  person : returnedPerson
            ))
          }).catch(error => {
            console.log('error trying to update user', error)
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
      <Filter filter={filter} onChange={(e) => setFilter(e.target.value)} />

      <h2>Add a new</h2>
      <PersonForm
        state={state}
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