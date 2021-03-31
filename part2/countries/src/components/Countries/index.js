import React from 'react'
import { Country } from './Country'

export const Countries = ({ countries, onClick }) => {

  const result = () => {
    if (countries.length > 10) {
      return <p>Too many matches, specify another filter</p>
    } else if (countries.length > 1 && countries.length <= 10) {
      return (
        <ul>
          {countries.map((country) =>
            <div key={country.name}>
              <li>{country.name} 
                <button onClick={() => onClick(country.name)}>show</button>
              </li>
            </div>
          )}
        </ul>
      )
    } else if (countries.length === 1) {
      return (
        <Country country={countries[0]} />
      )
    }
  }

  return (
    <>
      {result()}
    </>
  )
}