import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = ({ anecdotes, voteAnecdote, setNotification  } ) => {
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
                  voteAnecdote(anecdote)
                  setNotification(`You voted "${anecdote.content}"`, 5)
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

const mapStateToProps = (state) => {
  if (state.filter) {
    // return anecdotes.filter(anecdote =>
    //   anecdote.content.toLowerCase().indexOf(filter.toLowerCase()) > 1
    // )
    return {
      anecdotes: state.anecdotes.filter((anecdote) =>
        anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
    }
  }

  return { anecdotes: state.anecdotes }
}
  
const mapDispatchToProps = {
  voteAnecdote,
  setNotification
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)
  
export default ConnectedAnecdoteList
