import React, { useState } from 'react'
import { useQuery } from '@apollo/client'

import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const [genre, setGenre] = useState("");

  const result = useQuery(ALL_BOOKS)

  if (!props.show) {
    return null
  }

  if (result.loading)  {
    return <div>loading...</div>
  }

  const handleChange = (genre) => {
    if (genre === 'all genres') return setGenre(null)
    setGenre(genre);
  };

  let books = result.data.allBooks

  const genres = result.data.allBooks.flatMap((book) => book.genres);
  // remove duplicates genres
  const genresList = [...new Set(genres), 'all genres'];
  
  if (genre) {
    books = books.filter((book) => book.genres.includes(genre))
  }

  return (
    <div>
      <h2>books</h2>
      {genresList.map((genre) => (
        <button
          key={genre}
          onClick={() => handleChange(genre)}
        >
          {genre}
        </button>
      ))}
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

export default Books