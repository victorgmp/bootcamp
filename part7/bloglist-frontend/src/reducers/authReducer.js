import authService from '../services/auth'

const initialState = authService.loadUser()

const authReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'LOAD_SESSION':
    return action.data
  case 'LOGIN':
    return action.data
  case 'LOGOUT':
    return null
  default:
    return state
  }
}

export const login = ({ username, password }) => {
  return async (dispatch) => {
    const user = await authService.login({ username, password })
    authService.saveUser(user)
    dispatch({
      type: 'LOGIN',
      data: user
    })
  }
}

export const loadSession = () => {
  return (dispatch) => {
    const user = authService.loadUser()
    dispatch({
      type: 'LOAD_SESSION',
      data: user
    })
  }
}

export const logout = () => {
  return (dispatch) => {
    authService.logout()
    dispatch({
      type: 'LOGOUT'
    })
  }
}

export default authReducer