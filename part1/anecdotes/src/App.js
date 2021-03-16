import React, { useState } from 'react'

const App = ({ anecdotes }) => {
  const initialVotes = new Array(anecdotes.length).fill(0)
  const [selected, setSelected] = useState(0)
  const [votes, updateVotes] = useState(initialVotes)
  
  const handleClick = () => {
    const random = Math.floor(Math.random() * ((anecdotes.length) - 0)) + 0
    setSelected(random)
  }

  const handleVotes = (selected) => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    updateVotes(newVotes)    
  }

  const maxVotesIndex = votes.indexOf(Math.max(...votes));
  
  return (
    <>
      <div>
        <p>{anecdotes[selected]}</p>
        <p>Has {votes[selected]} votes</p>
        <button onClick={() => handleVotes(selected)}>
          vote
        </button>
        <button onClick={handleClick}>
          next anecdote
        </button>
      </div>
      { votes[maxVotesIndex] > 0 && (
      <div>
        <h1>This is the anecdote with max votes</h1>
        <p>{anecdotes[maxVotesIndex]}</p>
        <p>Has {votes[maxVotesIndex]} votes</p>
        </div>
      )}
    </>
  )
}

export default App
