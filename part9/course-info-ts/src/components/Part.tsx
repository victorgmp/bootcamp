import React from 'react';

import { CoursePart } from '../types';

interface PartProps {
  coursePart: CoursePart;
}

const Part: React.FC<PartProps> = ({ coursePart }) => {
  if (coursePart.name === 'Fundamentals') {
    return (
      <>
        <h3>
          <p>{coursePart.name}</p>
        </h3>
        <div>
          <p>Number of exercises: {coursePart.exerciseCount}</p>
        </div>
        <div>
          <p>Course description: {coursePart.description}</p>
        </div>
      </>
    );
  } else if (coursePart.name === 'Using props to pass data') {
    return (
      <>
        <h3>
          <p>{coursePart.name}</p>
        </h3>
        <div>
          <p>Number of exercises: {coursePart.exerciseCount}</p>
        </div>
        <div>
          <p>Number of group projects: {coursePart.groupProjectCount}</p>
        </div>
      </>
    );
  } else if (coursePart.name === 'Deeper type usage') {
    return (
      <>
        <h3>
          <p>{coursePart.name}</p>
        </h3>
        <div>
          <p>Number of exercises: {coursePart.exerciseCount}</p>
        </div>
        <div>
          <p>Course description: {coursePart.description}</p>
        </div>
        <div>
          <p>Exercise submission link: {coursePart.exerciseSubmissionLink}</p>
        </div>
      </>
    );
  }
  return null;
};

export default Part;