interface exercisesResult {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number | undefined,
  ratingDescription: string | undefined,
  target: number,
  average: number
}

export const calculateExercises = (hours: number[], target: number): exercisesResult => {
  const periodLength = hours.length;
  const trainingDays = hours.filter((hour) => hour > 0).length;
  const totalHours = hours.reduce((acc, value) => acc + value, 0);
  const average = totalHours / hours.length;
  const success = average >= target;

  let rating;
  let ratingDescription;

  if (average < target) {
    rating = 1;
    ratingDescription = 'you did not reach your goal this week, try to improve next week';
  } else if (average === target) {    
    rating = 2;
    ratingDescription = 'very good, you reached your goal this week, keep improving';
  } else if (average > target) {
    rating = 3;
    ratingDescription = 'very good, you exceeded your goal for this week';    
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

