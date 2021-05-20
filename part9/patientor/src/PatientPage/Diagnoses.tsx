import React from 'react';
import { Entry } from '../types';
import { useStateValue } from '../state';

interface DiagnosesProps {
  entry: Entry;
}

const Diagnoses: React.FC<DiagnosesProps> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <ul>
      {entry.diagnosisCodes?.map((diagnosisCode: string, i: number) => {
        const diagnosis = diagnoses?.filter(
          (diagnosis) => diagnosis.code === diagnosisCode
        );
        return (
          <li key={`${entry.id}-${i}`}>
            <span>{diagnosisCode}</span>{" "}
            <span>{diagnosis?.length > 0 && diagnosis[0].name}</span>
          </li>
        );
      })}
    </ul>
  );
};

export default Diagnoses;
