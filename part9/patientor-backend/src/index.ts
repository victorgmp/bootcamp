import express, { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';

import diagnosesRouter from './routes/diagnosesRoute';
import patientsRouter from './routes/patientsRoute';

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));

const PORT = 3001;

app.get('/api/ping', (_req: Request, res: Response) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnoses', diagnosesRouter);

app.use('/api/patients', patientsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
