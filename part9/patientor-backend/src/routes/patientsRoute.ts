import express, { Request, Response } from 'express';

import patientService from '../services/patientsService';
import { toNewPatient } from '../utilts';

const router = express.Router();

router.get('/', (_req: Request, res: Response) => {
  res.send(patientService.getEntriesWithOutSsn());
});

router.post('/', (req: Request, res: Response) => {
  try {
    const newPatient = toNewPatient(req.body);

    const addedPatient = patientService.addEntry(newPatient);

    res.json(addedPatient);

  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(e.message);
  }
});

export default router;
