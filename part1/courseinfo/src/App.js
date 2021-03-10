import React from 'react'

const Header = ({ course }) => {
  return (
    <h1>{course}</h1>
  )
}

const Content = ({
  exercises1,
  exercises2,
  exercises3,
  part1,
  part2,
  part3,
}) => {
  return (
    <>
      <p>
        {part1} {exercises1}
      </p>
      <p>
        {part2} {exercises2}
      </p>
      <p>
        {part3} {exercises3}
      </p>
    </>
  )
}

const Total = ({
  exercises1,
  exercises2,
  exercises3,
}) => {
  return (
    <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const exercises1 = 10
  const exercises2 = 7
  const exercises3 = 14
  const part1 = 'Fundamentals of React'
  const part2 = 'Using props to pass data'
  const part3 = 'State of a component'

  return (
    <div>
      <Header course={course} />
      <Content
        exercises1={exercises1}
        exercises2={exercises2}
        exercises3={exercises3}
        part1={part1}
        part2={part2}
        part3={part3}
      />
      <Total
        exercises1={exercises1}
        exercises2={exercises2}
        exercises3={exercises3}
      />
    </div>
  )
}

export default App
