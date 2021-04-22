const initialState = ''

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      clearTimeout(state.delay);
      return action.data.content
    case 'REMOVE_NOTIFICATION':
      return initialState
    default:
      return state
  }
}

export const setNotification = (content, delay) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_NOTIFICATION",
      data: {
        content,
        delay: setTimeout(() => {
          dispatch(removeNotification(""))
        }, delay * 1000)
      }
    })
  }
}

export const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION'
  }
}

export default notificationReducer