import React, { useEffect, useState } from 'react'
import axios from 'axios'

export const Country = ({ country }) => {
  const [weather, setWeather] = useState([])
  const [loading, setLoading] = useState(false)

  const api_key = process.env.REACT_APP_API_KEY
  
  useEffect(() => {
    setLoading(true)
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
      .then(response => {
        setWeather(response.data)
        setLoading(false)
      })
  }, [api_key, country.capital])

  return (
    <div>
      <h2>{country.name}</h2>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h3>Languages</h3>
      <ul>
        {country.languages.map((language) =>
          <li key={language.name} >{language.name}</li>
        )}
      </ul>
      <img src={country.flag} alt={country.name} style={{ height: '100px' }} />

      {loading ? (<p>Loading...</p>) : ''}

      {weather.current && (
        <>
          <h2>Weather in {country.capital}</h2>
          <p>Temperature: {weather.current.temperature}</p>
          <img src={weather.current.weather_icons} alt={country.capital} style={{ height: '50px' }} />
          <p>Wind: {weather.current.wind_speed} mph direction {weather.current.wind_dir} </p>
        </>
      )}

    </div>

  )
}
