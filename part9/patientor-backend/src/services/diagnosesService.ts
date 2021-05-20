import diagnosesData from '../../data/diagnoses.json';

import { Diagnosis } from '../types';

const diagnoses: Diagnosis[] = diagnosesData;

const getEntries = (): Diagnosis[] => {
  return diagnoses;
};

const addEntry = (): null => {
  return null;
};

export default { getEntries, addEntry };
