import axios from 'axios';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Header, Container, Icon, Button } from 'semantic-ui-react';

import { apiBaseUrl } from '../constants';
import { setPatient, useStateValue, addEntry } from '../state';
import { Patient, Entry } from '../types';

import EntryDetail from './EntryDetail';
import AddEntryModal from "../AddEntryModal";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";

import {
  isHealthCheckEntry,
  isOccupationalHealthcareEntry,
  isHospitalEntry,
} from "../utils";

const PatientPage: React.FC = () => {
  const [{ patient }, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const { id } = useParams<{ id: string }>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
  };

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );

        dispatch(setPatient(patientFromApi));

      } catch (e) {
        console.log(e);
      }
    };

    if (!patient || patient.id !== id) {
      void fetchPatient();
    }
  }, [patient, id, dispatch]);

  const showgenderIcon = () => {
    if (patient?.gender === 'male') {
      return <Icon name='mars' size='big' />;
    } else if (patient?.gender === 'female') {
      return <Icon name='venus' size='big' />;
    } else if (patient?.gender === 'other') {
      return <Icon name='genderless' size='big' />;
    } else return null;
  };

  const getEntryType = (values: EntryFormValues) => {
    let type;
    if (isHealthCheckEntry(values)) {
      type = "HealthCheck";
    } else if (isOccupationalHealthcareEntry(values)) {
      type = "OccupationalHealthcare";
    } else if (isHospitalEntry(values)) {
      type = "Hospital";
    }

    return type;
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    let entry;
    const type = getEntryType(values);

    if (isOccupationalHealthcareEntry(values)) {
      if (
        values.sickLeave &&
        values.sickLeave.startDate !== "" &&
        values.sickLeave.endDate !== ""
      ) {
        entry = { ...values, type };
      } else {
        entry = { ...values, type, sickLeave: undefined };
      }
    } else if (isHospitalEntry(values)) {
      if (
        values.discharge &&
        values.discharge.date !== "" &&
        values.discharge.criteria !== ""
      ) {
        entry = { ...values, type };
      } else {
        entry = { ...values, type, discharge: undefined };
      }
    }

    try {
      const { data: newEntry } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        entry
      );

      dispatch(addEntry(newEntry));
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

  return (
    <div>
      {patient
        ? (
          <Container>
            <Header as='h2'>{patient.name} {showgenderIcon()}</Header>
            <p>ssn: {patient.ssn}</p>
            <p>date of birth: {patient.dateOfBirth}</p>
            <p>occupation: {patient.occupation}</p>
            {patient?.entries && patient.entries?.length > 0 && <h3>Entries</h3>}
            {patient?.entries?.map((entry: Entry) => (
              <EntryDetail key={entry.id} entry={entry} />
            ))}

            <AddEntryModal
              modalOpen={modalOpen}
              onSubmit={submitNewEntry}
              onClose={closeModal}
              error={error}
            />
            <Button onClick={() => openModal()}>Add New Entry</Button>
          </Container>
        )
        : (
          <Container>
            <Header as='h2'>Patient not found...</Header>
          </Container>
        )
      }
    </div>
  );
};

export default PatientPage;
