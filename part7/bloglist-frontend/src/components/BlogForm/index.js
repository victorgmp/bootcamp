import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { Form, Button } from 'react-bootstrap'

import { createBlog  } from '../../reducers/blogReducer'
import { setNotification } from '../../reducers/notificationReducer'

const BlogForm = ({ blogFormRef }) => {
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (e) => {
    e.preventDefault()

    const newBlog = {
      title,
      author,
      url
    }
    dispatch(createBlog(newBlog))

    const notificationValues = {
      message: `a new blog '${title}' by ${author} added!`,
      type: 'success',
      time: 5
    }
    dispatch(setNotification(notificationValues))

    setTitle('')
    setAuthor('')
    setUrl('')
    blogFormRef.current.toggleVisibility()
  }

  return (
    <div className="formDiv">
      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>title:</Form.Label>
          <Form.Control
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Form.Label>author:</Form.Label>
          <Form.Control
            type="text"
            name="author"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />

          <Form.Label>url:</Form.Label>
          <Form.Control
            type="text"
            name="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          <Button variant="primary" type="submit">save</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

BlogForm.propTypes = {
  blogFormRef: PropTypes.object.isRequired
}

export default BlogForm