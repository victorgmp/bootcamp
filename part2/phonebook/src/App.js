import React, { useState } from 'react'
import { Filter } from './components/Filter'
import { PersonForm } from './components/PersonForm'
import { Persons } from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [state, setState] = useState({
    name: '',
    number: ''
  })
  const [filter, setFilter] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value
    })
  }

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().indexOf(filter.toLowerCase()) > -1
  );
  
  const handleSubmit = (e) => {
    e.preventDefault()
    const nameExist = persons.find(person => person.name === state.name)

    if (nameExist) {
      alert(`${state.name} is already added to phonebook`)
    } else {
      const newPerson = {
        name: state.name,
        number: state.number
      }
      setPersons([
        ...persons,
        newPerson
      ])
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filter={filter} onChange={(e) => setFilter(e.target.value)} />

      <h2>Add a new</h2>
      <PersonForm state={state} handleChange={handleChange} handleSubmit={handleSubmit} />

      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App