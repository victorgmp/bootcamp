import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLike, deleteBlog, own }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 5,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const label = visible ? 'hide' : 'view'

  return (
    <div blog-test-id="blog"  style={blogStyle} className='blog'>
      <div>
        <i>{blog.title}</i> by {blog.author} {' '}
        <button onClick={() => setVisible(!visible)}>{label}</button>
      </div>
      {visible &&(
        <>
          <div>{blog.url}</div>
          <div>{blog.user.id}</div>
          <div id="likes">
            likes {blog.likes} {' '}
            <button id="like-button" onClick={handleLike}>like</button>
          </div>
          {own&&<button onClick={() => deleteBlog(blog.id)}>remove</button>}
        </>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  handleLike: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func,
  own: PropTypes.bool
}

export default Blog
