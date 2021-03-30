import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { Filter } from './components/Filter'
import { Countries } from './components/Countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')


  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => setCountries(response.data))
  }, [])

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().indexOf(filter.toLowerCase()) > -1
  )

  return (
    <div>
      <Filter
        filter={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      <Countries
        countries={filteredCountries}
        onClick={(value) => setFilter(value)}  
      />

    </div>
  )
}

export default App