import { v4 as uuid } from 'uuid';

import patientsData from '../../data/patients.json';

import { NewPatient, Patient, PatientWithOutSsn } from '../types/patient';

const patients: Patient[] = patientsData;

const getEntries = (): Patient[] => {
  return patients;
};

const getEntriesWithOutSsn = (): PatientWithOutSsn[] => {
  return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addEntry = (entry: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...entry
  };

  patients.push(newPatient);
  return newPatient;
};

export default { getEntries, getEntriesWithOutSsn, addEntry };