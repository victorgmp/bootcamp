export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

export type PatientWithOutSsn = Omit<Patient, 'ssn'>;

export type NewPatient = Omit<Patient, 'id'>;

