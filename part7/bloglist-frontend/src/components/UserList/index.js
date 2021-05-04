import React from 'react'
// import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const UserList = ({ users }) => {
  // const users = useSelector((state) => state.users)

  return (
    <div>
      <h2>User list</h2>
      <Table striped>
        <tbody>
          <tr>
            <td><strong>User name</strong></td>
            <td><strong>Blogs created</strong></td>
          </tr>
          {users
            .sort((a,b) => b.blogs.length - a.blogs.length)
            .map((user) =>
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.blogs.length || 0}</td>
              </tr>
            )}
        </tbody>
      </Table>
    </div>
  )
}

export default UserList