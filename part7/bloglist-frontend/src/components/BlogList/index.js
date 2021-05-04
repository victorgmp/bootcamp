import React from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const BlogList = ({ blogs }) => {

  return (
    <div>
      <h2>Blog list</h2>
      <Table striped>
        <tbody>
          {blogs
            .sort((a,b) => b.likes - a.likes)
            .map((blog) =>
              <tr key={blog.id}>
                <td>
                  <Link to={`/blogs/${blog.id}`} >
                    <i>{blog.title}</i> by {blog.author}
                  </Link>
                </td>
              </tr>
            )
          }
        </tbody>
      </Table>

    </div>
  )
}

export default BlogList
