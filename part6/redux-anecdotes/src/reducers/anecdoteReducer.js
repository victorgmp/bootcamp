import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_ANECDOTES':
      return action.data
    case 'CREATE_ANECDOTE':
      return [...state, action.data]
    case 'VOTE_ANECDOTE':
      const votedAnecdote = action.data
      return state.map(anecdote =>
        anecdote.id !== votedAnecdote.id ? anecdote : votedAnecdote
      )
    default:
      return state
  }
}

export const initialAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.create(content)
    dispatch({
      type: 'CREATE_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const voteAnecdote = (updatedObject) => {
  const { id, ...restObject } = updatedObject
  const votedAnecdote = {
    ...restObject,
    votes: updatedObject.votes + 1
  }

  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.update(id, votedAnecdote)
    dispatch({
      type: 'VOTE_ANECDOTE',
      data: updatedAnecdote
    })
  }
}

export default anecdoteReducer