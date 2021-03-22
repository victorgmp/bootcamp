import React from 'react'

export const Filter = ({ filter, onChange }) => (
  <div>
    filter shown with: 
  <input
      name="filter"
      value={filter}
      onChange={onChange}
    />
  </div>
)
