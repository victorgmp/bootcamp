import axios from 'axios'
import authService from './auth'

const baseUrl = '/api/blogs'

const getconfig = () => {
  return {
    headers: { Authorization: `Bearer ${authService.loadUser().token}` }
  }
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newBlog) => {
  const response = await axios.post(baseUrl, newBlog, getconfig())
  return response.data
}

const update = async (id, updatedObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedObject)
  return response.data
}

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, getconfig())
  return response
}

const createComment = async (id, content) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, { content })
  return response.data
}

export default { getAll, create, update, remove, createComment }
