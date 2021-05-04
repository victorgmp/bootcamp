import axios from 'axios'
const baseUrl = '/api/login'

const storageKey = 'loggedBlogAppUser'

const saveUser = (user) => {
  return localStorage.setItem(storageKey, JSON.stringify(user))
}

const loadUser = () => {
  return JSON.parse(localStorage.getItem(storageKey))
}

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

const logout = () => {
  return localStorage.removeItem(storageKey)
}

export default {
  saveUser,
  loadUser,
  login,
  logout
}