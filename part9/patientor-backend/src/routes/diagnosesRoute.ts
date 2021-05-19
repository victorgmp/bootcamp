import express, { Request, Response } from 'express';

import diagnosisService from '../services/diagnosesService';

const router = express.Router();

router.get('/', (_req: Request, res: Response) => {
  res.send(diagnosisService.getEntries());
});

router.post('/', (_req: Request, res: Response) => {
  res.send('Saving a diagnosis');
});

export default router;
