/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express, { Request, Response } from 'express';

import patientService from '../services/patientsService';
import { toNewEntry, toNewPatient } from '../utilts';

const router = express.Router();

router.get('/', (_req: Request, res: Response) => {
  res.send(patientService.getPatients());
});

router.post('/', (req: Request, res: Response) => {
  try {
    const newPatient = toNewPatient(req.body);

    const addedPatient = patientService.addPatient(newPatient);

    res.json(addedPatient);

  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.get('/:id', (req: Request, res: Response) => {
  const patient = patientService.getPatientsById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);  }

});

router.post('/:id/entries', (req: Request, res: Response) => {
  try {
    const patient = patientService.getPatientsById(req.params.id);
    const newEntry = toNewEntry(req.body);

    if (patient && newEntry) {
      const addedEntry = patientService.addEntry(patient, newEntry);
      res.json(addedEntry);
    }

  } catch (e) {
    res.status(400).send(e.message);
  }
});

export default router;
