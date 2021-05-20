interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

export interface CoursePartBase2 extends CoursePartBase {
  description: string;
}

interface CoursePartOne extends CoursePartBase2 {
  name: "Fundamentals";
  description: string;
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartBase2 {
  name: "Deeper type usage";
  description: string;
  exerciseSubmissionLink: string;
}

export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree;
