import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'GET_BLOGS':
    return action.data
  case 'CREATE_BLOG':
    return [...state, action.data]
  case 'LIKE_BLOG':
    const likedBlog = action.data
    return state.map(blog =>
      blog.id !== likedBlog.id ? blog : likedBlog
    )
  case 'REMOVE_BLOG':
    const id = action.data
    return state.filter(blog =>
      blog.id !== id
    )
  case 'CREATE_COMMENT':
    const { postId, newComment } = action.data
    return state.map((blog) =>
      blog.id !== postId
        ? blog
        : { ...blog, comments: [...blog.comments, newComment] }
    )
  default:
    return state
  }
}

export const getBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'GET_BLOGS',
      data: blogs
    })
  }
}

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content)
    dispatch({
      type: 'CREATE_BLOG',
      data: newBlog
    })
  }
}

export const likedBlog = (id, updatedContent) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(id, updatedContent)
    dispatch({
      type: 'LIKE_BLOG',
      data: updatedBlog
    })
  }
}

export const removedBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    dispatch({
      type: 'REMOVE_BLOG',
      data: id
    })
  }
}

export const createComment = (id, content) => {
  return async (dispatch) => {
    const newComment = await blogService.createComment(id, content)
    dispatch({
      type: 'CREATE_COMMENT',
      data: {
        newComment,
        postId: id
      }
    })
  }
}

export default blogReducer
