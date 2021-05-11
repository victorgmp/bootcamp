import React from 'react'
import { useQuery } from '@apollo/client'

import { ALL_BOOKS, ME } from '../queries'

const Recommend = (props) => {
  const meResult = useQuery(ME)
  const favoriteGenre = meResult?.data?.me?.favoriteGenre
  
  const result = useQuery(ALL_BOOKS, {
    variables: { filterByGenre: favoriteGenre },
    fetchPolicy: "no-cache"
  })
  
  if (!props.show) {
    return null
  }
  
  if (result.loading)  {
    return <div>loading...</div>
  }
  
  const books = result.data.allBooks

  return (
    <div>
      <h2>Recommendations</h2>
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(b =>
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}


export default Recommend
