import React, {useState} from 'react'

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    handleLogin({
      username,
      password
    })

    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        username:
    <input
          type="text"
          name="username"
          values={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        password:
    <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <button type="submit">login</button>
      </div>
    </form>

  )
}

export default LoginForm