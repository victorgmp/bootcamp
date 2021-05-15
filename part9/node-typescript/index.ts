import express, { Request, Response } from 'express';

import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello Full Stack!');
});


app.get('/bmi', (req: Request, res: Response) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  const areValids: boolean =
    !Number.isNaN(height) && !Number.isNaN(weight);

  if (!areValids) {
    return res.send({ error: 'malformatted parameters' });
  }
  
  const result = calculateBmi(height, weight);

  return res.send({
    weight,
    height,
    result
  });
});

app.post('/exercises', (req: Request, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any,  @typescript-eslint/no-unsafe-assignment
  const { dailyExercises, target }: { dailyExercises: number[]; target: number } = req.body;

  if (!dailyExercises || !target) {
    return res.send({ error: "parameters missing" });
  }

  const areValids: boolean =
  !Array.isArray(dailyExercises) && !Number.isNaN(target);

  if (!areValids) {
    return res.send({ error: 'malformatted parameters' });
  }

  const result = calculateExercises(dailyExercises, target);
  console.log('result', result);
  return res.send(result);
});


const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});