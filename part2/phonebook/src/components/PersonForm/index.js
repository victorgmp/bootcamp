import React from 'react'

export const PersonForm = ({ state, handleChange, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <div>
      name: <input name="name" value={state.name} onChange={handleChange} />
    </div>
    <div>
      number: <input name="number" value={state.number} onChange={handleChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)