const initialState = null

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return action.data
  case 'CLEAR_NOTIFICATION':
    return initialState
  default:
    return state
  }
}

let timeoutId

export const setNotification = ({ message, type, time }) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: { message, type }
    })

    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION'
      })
    }, time * 1000)
  }
}

export const clearNotification = () => (
  { type: 'CLEAR_NOTIFICATION' }
)

export default notificationReducer