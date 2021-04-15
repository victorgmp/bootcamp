import React, { useState } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog }) => {
  const [showDetails, setShowDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 5,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  const toggleLikes = () => {
    const addLikes = blog.likes + 1

    const blogObject = {
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: addLikes,
      user: blog.user.id
    }

    updateBlog(blogObject)
  }

  const handleRemove = () => {
    deleteBlog(blog.id, blog.title)
  }

  return (
    <div style={blogStyle} className='blog'>
      {blog.title} - {blog.author} {' '}
      <button onClick={toggleDetails}>view</button> <br />
      {showDetails && (
        <>
          {blog.url} <br />
          likes {blog.likes} {' '}
          <button onClick={toggleLikes}>like</button> <br />
          <button onClick={handleRemove}>remove</button>
        </>
      )}
    </div>
  )
}

export default Blog
