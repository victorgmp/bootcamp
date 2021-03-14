import React, { useState } from 'react'

const Button = ({ text, onClick }) => (
  <button onClick={onClick} >
    {text}
  </button>
)

const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad, total, average, percentage }) => {
  return (
    <>
      <h1>Statistics</h1>
      {total ?
        (
          <>
            <table>
              <tbody>
                <Statistic text="good" value={good}/>
                <Statistic text="neutral" value={neutral}/>
                <Statistic text="bad" value={bad}/>
                <Statistic text="all" value={total}/>
                <Statistic text="average" value={average ? average : 0}/>
                <Statistic text="positive" value={percentage ? percentage : 0} />
              </tbody>
          </table>
          </>
        ) :
        (
          <p>No feedback given...</p>
        )
      }
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }
  const handleBadClick = () => {
    setBad(bad + 1)
  }

  const total = good + neutral + bad
  const average = (good - bad) / total
  const percentage = (100 * good) / total

  return (
    <div>
      <h1>Give feedback</h1>
      <Button text={'good'} onClick={handleGoodClick} />
      <Button text={'neutral'} onClick={handleNeutralClick} />
      <Button text={'bad'} onClick={handleBadClick} />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        total={total}
        average={average}
        percentage={percentage}
      />
    </div>
  )
}

export default App