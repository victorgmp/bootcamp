import userService from '../services/user'

const userReducer = (state = [], action) => {
  switch (action.type) {
  case 'GET_USERS':
    return action.data
  case 'GET_USER_BY_ID':
    return action.data
  default:
    return state
  }
}

export const getUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    dispatch({
      type: 'GET_USERS',
      data: users
    })
  }
}

export const getUserById = (id) => {
  return async (dispatch) => {
    const user = await userService.getById(id)
    dispatch({
      type: 'GET_USER_BY_ID',
      data: user
    })
  }
}

export default userReducer