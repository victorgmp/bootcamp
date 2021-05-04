import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Switch, Route, Redirect } from 'react-router-dom'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Menu from './components/Menu'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import User from './components/User'

import UserList from './components/UserList'
import { getBlogs } from './reducers/blogReducer'
import { getUsers } from './reducers/userReducer'

const App = () => {
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getBlogs())
    dispatch(getUsers())
  }, [dispatch])

  const blogs = useSelector((state) => state.blogs)
  const users = useSelector((state) => state.users)
  const user = useSelector((state) => state.user)
  console.log('user', user)

  return (
    <div className="container">
      <Menu username={user ? user.username : null} />
      <h1>Blogs app</h1>
      <Notification />
      <Switch>
        <Route exact path="/users/:id">
          <User users={users} />
        </Route>
        <Route exact path="/users">
          <UserList users={users} />
        </Route>
        <Route exact path="/blogs/:id">
          <Blog blogs={blogs} blogOwner={user} />
        </Route>
        <Route exact path="/blogs">
          <>
            <Togglable buttonLabel="new blog" ref={blogFormRef}>
              <BlogForm blogFormRef={blogFormRef} />
            </Togglable>
            <BlogList blogs={blogs} />
          </>
        </Route>
        <Route exact path="/login">
          <LoginForm />
        </Route>
        <Route exact path="/">
          {user === null
            ? <Redirect to="/login" />
            : <Redirect to="/blogs" />
          }
        </Route>
      </Switch>
    </div>
  )
}

export default App