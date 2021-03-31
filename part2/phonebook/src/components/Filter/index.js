import React from 'react'

const Filter = ({ filter, onChange }) => (
  <div>
    filter shown with: 
  <input
      name="filter"
      value={filter}
      onChange={onChange}
    />
  </div>
)

export default Filter
