import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { likedBlog, removedBlog } from '../../reducers/blogReducer'
import { setNotification } from '../../reducers/notificationReducer'

import Blog from '../Blog'

const BlogList = ({ blogOwner }) => {
  const dispatch = useDispatch()

  const blogs = useSelector((state) => state.blogs)

  const handleConfirm = (message) => {
    return window.confirm(message)
  }

  const handleRemove = async (id, title) => {
    const message = `do you really want to eliminate ${title}?`
    const result = handleConfirm(message)

    if (result) {
      dispatch(removedBlog(id))

      const notificationValues = {
        message: `Deleted blog ${title}`,
        type: 'success',
        time: 5
      }
      dispatch(setNotification(notificationValues))
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

  return (
    <div>
      <h2>Blog list</h2>
      {blogs
        .sort((a,b) => b.likes - a.likes)
        .map((blog) =>
          <Blog
            key={blog.id}
            blog={blog}
            handleLike={() => dispatch(likedBlog(blog))}
            deleteBlog={() => handleRemove(blog.id, blog.title)}
            own={blogOwner===blog.user.username}
          />
        )
      }
    </div>
  )
}

export default BlogList
