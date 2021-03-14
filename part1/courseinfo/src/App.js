/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
import React from 'react';

const Header = ({ course }) => {
  return (
    <h1>
      {course}
    </h1>
  );
};

const Part = ({ exercises, part }) => {
  return (
    <p>
      {part} {exercises}
    </p>
  );
};

const Content = ({
  parts,
}) => {
  return (
    parts.map((part) => (
      <Part
        exercises={part.exercises}
        part={part.name}
      />
    ))
  );
};

const Total = ({ parts }) => {
  // const total = parts.exercises.reduce((acc, curr) => acc + curr, 0);
  let total = 0;
  parts.forEach((part) => {
    total += part.exercises;
  });

  return (
    <p>
      Number of exercises {total}
    </p>
  );
};

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App;
