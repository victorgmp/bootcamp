import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useRouteMatch, useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Button, InputGroup, FormControl } from 'react-bootstrap'


import { likedBlog, removedBlog, createComment } from '../../reducers/blogReducer'
import { setNotification } from '../../reducers/notificationReducer'

const Blog = ({ blogs, blogOwner }) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const [comment, setComment] = useState('')

  const match = useRouteMatch('/blogs/:id')
  const blog = match
    ? blogs.find(blog => blog.id === match.params.id)
    : null
  if (!blog) return null

  const own = blogOwner.username === blog.user.username


  const handleLike = async () => {
    const { id, author, url, title, user } = blog
    const updatedBlog = {
      author,
      url,
      title,
      user,
      likes: blog.likes + 1
    }

    dispatch(likedBlog(id, updatedBlog))
  }

  const handleConfirm = (message) => {
    return window.confirm(message)
  }

  const handleRemove = async (id) => {
    const message = `do you really want to eliminate ${blog.title}?`
    const result = handleConfirm(message)

    if (result) {
      dispatch(removedBlog(id))

      const notificationValues = {
        message: `Deleted blog ${blog.title}`,
        type: 'success',
        time: 5
      }
      dispatch(setNotification(notificationValues))

      history.push('/')
    }
    // catch (error) {
    //   console.log('error trying to delete blog', error)

    //   const notificationValues = {
    //     message: `error trying to delete blog: ${title}`,
    //     type: 'error',
    //     time: 5
    //   }
    //   dispatch(setNotification(notificationValues))
    // }
  }

  const handleComment = () => {
    dispatch(createComment(blog.id, comment))
    setComment('')

    const notificationValues = {
      message: `New comment added '${comment}'`,
      type: 'success',
      time: 5
    }
    dispatch(setNotification(notificationValues))
  }

  return (
    <>
      <div>
        <h2>{blog.title}</h2>
        <p>
          <a href={blog.url} target="_blank" rel="noreferrer">{blog.url}</a>
        </p>
        <p>{blog.likes} likes {''}
          <Button
            variant="primary"
            id="like-button"
            onClick={handleLike}
          >
            like
          </Button>
        </p>
        <p>added by {blog.author}</p>
        {own&&<Button variant="danger" onClick={() => handleRemove(blog.id)}>remove</Button>}
      </div>
      <div>
        <h3>Comments</h3>
        <div>
          <InputGroup className="mb-3 col-12 col-m-6 col-lg-6">
            <FormControl
              name="title"
              id="title"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <InputGroup.Append>
              <Button variant="primary" onClick={handleComment}>add comment</Button>
            </InputGroup.Append>
          </InputGroup>

        </div>
        <ul>
          {blog.comments.map((comment) =>
            <li key={comment.id}>{comment.content}</li>
          )}
        </ul>
      </div>
    </>
  )
}

Blog.propTypes = {
  blogs: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      likes: PropTypes.number.isRequired,
      comments: PropTypes.arrayOf(
        PropTypes.shape({
          content: PropTypes.string.isRequired
        })
      )
    }).isRequired
  ).isRequired,
  blogOwner: PropTypes.object
}

export default Blog
