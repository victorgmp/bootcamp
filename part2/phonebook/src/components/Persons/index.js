import React from 'react'

export const Persons = ({ persons }) => (
    persons.map(person =>
      <p key={person.name}>{person.name}: {person.number}</p>
    )
)
