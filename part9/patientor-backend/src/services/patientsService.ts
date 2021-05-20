import { v4 as uuid } from 'uuid';

import patientsData from '../../data/patients';

import { NewEntry, NewPatient, Patient, PublicPatient } from '../types';

const patients: Patient[] = patientsData;

const getPatients = (): PublicPatient[] => {
  return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...entry
  };

  patients.push(newPatient);
  return newPatient;
};

const addEntry = (patient: Patient, newEntry: NewEntry): Patient => {
  const newEntryToAdd = {
    ...newEntry,
    id: uuid()
  };
  patient.entries.push(newEntryToAdd);

  return patient;
};

const getPatientsById = (id: string): Patient | undefined => {
  const patient = patients.find((patient) => patient.id === id);
  return patient;
};

export default { addPatient, getPatients, addEntry, getPatientsById };