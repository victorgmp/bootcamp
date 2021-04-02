import React from 'react'

const Contacts = ({ contacts, handleDelete }) => (
  <ul>
    {contacts.map(contact =>
      <li key={contact.id}>
        {contact.name}: {contact.number}
        <button onClick={() => handleDelete(contact.id, contact.name)}>delete</button>
      </li>
    )}
  </ul>
)

export default Contacts
