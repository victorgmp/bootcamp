export const calculateBmi = (height: number, weight: number): string => {
  const h = height / 100;
  const bmi = weight / Math.pow(h, 2);

  if (bmi <= 18.5) {
    return `BMI: '${bmi}' - Underweight`;
  } else if (bmi > 18.5 && bmi <= 23) {
    return `BMI: '${bmi}' - Normal range`;
  } else if (bmi > 23 && bmi <= 25) {
    return `BMI: '${bmi}' - Overweight—at risk`;
  } else if (bmi > 25 && bmi <= 30) {
    return `BMI: '${bmi}' - Overweight—moderately obese`;
  } else if (bmi > 30) {
    return `BMI: '${bmi}' - Overweight—severely obese`;
  }

  return 'please insert a valid data';
};

// const height = Number(process.argv[2])
// const weight = Number(process.argv[3])

// console.log(calculateBmi(height, weight));