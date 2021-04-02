import React from 'react'

const ContactForm = ({ values, handleChange, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <div>
      name: <input name="name" value={values.name} onChange={handleChange} />
    </div>
    <div>
      number: <input name="number" value={values.number} onChange={handleChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

export default ContactForm
