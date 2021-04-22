import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (filter) {
      // return anecdotes.filter(anecdote =>
      //   anecdote.content.toLowerCase().indexOf(filter.toLowerCase()) > 1
      // )
      return anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    }

    return anecdotes
  })

  return (
    <div>      
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button
                onClick={() => {
                  dispatch(voteAnecdote(anecdote))
                  dispatch(setNotification(`You voted "${anecdote.content}"`, 5))
                }}
              >
                vote
              </button>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default AnecdoteList
