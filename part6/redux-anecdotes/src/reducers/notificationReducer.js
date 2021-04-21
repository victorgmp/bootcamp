const initialState = ''

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_MESSAGE':
      return action.content
    case 'REMOVE_MESSAGE':
      return initialState
    default:
      return state
  }
}

export const setMessage = (content) => {
  return {
    type: 'SET_MESSAGE',
    content
  }
}

export const removeMessage = (content) => {
  return {
    type: 'REMOVE_MESSAGE'
  }
}

export default notificationReducer