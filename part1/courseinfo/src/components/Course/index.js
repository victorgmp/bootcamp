/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
import React from 'react';

const Header = ({ course }) => (
  <h1>
    {course}
  </h1>
);

const Part = ({ exercises, name }) => (
  <p>
    {name} {exercises}
  </p>
);

const Content = ({ parts }) => (
  <div>
    {parts.map((part) => (
      <Part
        key={part.id}
        exercises={part.exercises}
        name={part.name}
      />
    ))}
  </div>
);

const Total = ({ parts }) => {
  const exercises = parts.map((part) => part.exercises);
  const total = exercises.reduce((acc, curr) => acc + curr);

  return (
    <p>
      Number of exercises {total}
    </p>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;
