import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'
import { useDispatch } from 'react-redux'

import { logout } from '../../reducers/authReducer'

const Menu = ({ username }) => {
  const history = useHistory()
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
    history.push('/login')
  }

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as="span">
              <Link to="/blogs">blogs</Link>
            </Nav.Link>
            <Nav.Link as="span">
              <Link to="/users">users</Link>
            </Nav.Link>
            <Nav.Link as="span">
              {username
                ? (
                  <>
                    <em>{username} logged in </em>
                    <Link to="" onClick={handleLogout}>logout</Link>
                  </>
                )
                : <Link to="/login">login</Link>
              }
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default Menu
