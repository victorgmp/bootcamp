import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import Select from 'react-select'

import { EDIT_AUTHOR } from '../queries'

const EditAuthor = ({ authors, notify }) => {
  const [name, setName] = useState(null)
  const [born, setBorn] = useState('')

  const [editAuthor, result] = useMutation(EDIT_AUTHOR)

  useEffect(() => {
    if (result.data && !result.data.editAuthor) {
      notify('name not found')
    }
  }, [result.data]) // eslint-disable-line

  const submit = async (e) => {
    e.preventDefault()

    editAuthor({
      variables: { name, setBornTo: Number(born) }
    })

    setName('')
    setBorn('')
  }
  
  const authorList = authors.map((author) => {
    return { value: author.name, label: author.name }
  })
  
  return (
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <div>
          <Select
            placeholder="Select author..."
            defaultValue={name}
            // value={name ? { label: name, value: name } : null}
            onChange={(name) => setName(name.value)}
            options={authorList}
          />
        </div>
        <div>
          born {''}
          <input
            type="number"
            value={born}
            onChange={(e) => setBorn(e.target.value)}
          />      </div>
        <button type="submit">update actor</button>
      </form>
    </div>
  )
}

export default EditAuthor