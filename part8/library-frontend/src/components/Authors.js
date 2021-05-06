  
import React from 'react'
import { useQuery } from '@apollo/client'

import { ALL_AUTHORS } from '../queries'

import EditAuthor from './EditAuthor'

const Authors = ({ show, notify }) => {
  const result = useQuery(ALL_AUTHORS)
  if (result.loading)  {
    return <div>loading...</div>
  }

  if (!show) {
    return null
  }
  
  const authors = result.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th>
              name
            </th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      
      <EditAuthor authors={authors} notify={notify}/>
    </div>
  )
}

export default Authors
