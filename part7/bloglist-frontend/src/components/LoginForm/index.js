import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { login } from '../../reducers/authReducer'
import { setNotification } from '../../reducers/notificationReducer'
import { loadSession } from '../../reducers/authReducer'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const history = useHistory()

  const handleLogin = (e) => {
    e.preventDefault()

    dispatch(login({ username, password }))
    dispatch(loadSession())

    const notificationValues = {
      message: `${username} welcome back!`,
      type: 'success',
      time: 5
    }
    dispatch(setNotification(notificationValues))

    setUsername('')
    setPassword('')
    history.push('/blogs')
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            type="text"
            name="username"
            id="username"
            values={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Form.Label>password:</Form.Label>
          <Form.Control
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="primary" type="submit">
            login
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func
}

export default LoginForm