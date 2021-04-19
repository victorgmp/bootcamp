import React, { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [message, setMessage] = useState(null)

  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleMessage = (message) => {
    return window.confirm(message)
  }

  const handleLogin = async (credentials) => {
    const { username, password } = credentials

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)

    } catch (error) {
      console.log('error trying to log in', error.response.data)
      setMessage({
        content: error.response.data.error,
        type: 'error'
      })
    }

    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const handleLogout = () => {
    try {
      const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
      if (loggedUserJSON) {
        window.localStorage.removeItem('loggedBlogAppUser')
        setUser(null)
        blogService.setToken(null)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const addBlog = async (newBlog) => {
    const { title, author } = newBlog

    try {
      blogFormRef.current.toggleVisibility()
      const returnedBlog = await blogService.create(newBlog)
      setBlogs([...blogs, returnedBlog])

      setMessage({
        content: `a new blog ${title} by ${author} added`,
        type: 'success'
      })
    } catch (error) {
      console.log('error trying to add bog', error.response.data)
      setMessage({
        content: error.response.data.error,
        type: 'error'
      })
    }

    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const updateBlog = async (updatedBlog) => {
    const { id, ...blogObject } = updatedBlog

    try {
      const returnedBlog = await blogService.update(id, blogObject)
      setBlogs(blogs.map(blog => {
        return blog.id !== id ? blog : returnedBlog
      }))

      setMessage({
        content: `Updated ${blogObject.title}`,
        type: 'success'
      })
    } catch (error) {
      console.log('error trying to update user', error)
      setMessage({
        content: `error trying to update blog: ${blogObject.title} `,
        type: 'error'
      })
    }

    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const deleteBlog = async (id, title) => {
    try {
      const message = `do you really want to eliminate ${title}?`
      const result = handleMessage(message)

      if (result) {
        await blogService.remove(id)
        setBlogs(blogs.filter(blog => blog.id !== id))

        setMessage({
          content: `Deleted ${title}`,
          type: 'success'
        })
      }

    } catch (error) {
      console.log('error trying to delete blog', error)
      setMessage({
        content: `error trying to delete blog: ${title} `,
        type: 'error'
      })
    }

    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  return (
    <div>
      {
        user === null
          ? (
            <>
              <h2>Log in to application</h2>
              <Notification message={message} />
              <LoginForm handleLogin={handleLogin} />
            </>
          )
          : (
            <>
              <h2>Blogs</h2>
              <Notification message={message} />
              <Togglable buttonLabel="new blog" ref={blogFormRef}>
                <BlogForm addBlog={addBlog} />
              </Togglable>
              <p>
                {user.username} logged in {' '}
                <button onClick={handleLogout}> logout</button>
              </p>
              {blogs
                .sort((a,b) => b.likes - a.likes)
                .map(blog =>
                  <Blog
                    key={blog.id}
                    blog={blog}
                    updateBlog={updateBlog}
                    deleteBlog={deleteBlog}
                  />
                )
              }
            </>
          )
      }
    </div>
  )
}

export default App