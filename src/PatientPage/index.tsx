import React from 'react';
import axios from 'axios';
import { Entry, NewEntryData } from '../types';
import { useStateValue } from "../state";
import { useParams } from 'react-router-dom';
import EntryLine from "../components/EntryLine";
import AddEntryModal from "../AddEntryModal";
import { Button } from "@material-ui/core";
import { EntryFormValues } from '../AddEntryModal/AddEntryForm';
import { addEntry } from '../state';

import { apiBaseUrl } from '../constants';

const PatientPage = () => {
  const { id } = useParams<{id:string}>();
  const [{ patient }, dispatch ] = useStateValue();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const parseFields = (values:EntryFormValues):NewEntryData => {
    const { type, date, specialist, description } = values;
    const data = { type, date, specialist, description };
    let result:NewEntryData | undefined;

    if(type === 'Hospital') {
      const { discharge } = values;
      result = {...data, discharge, type};
    } else if (type === 'OccupationalHealthcare') {
      const { employerName, sickLeave } = values;
      result = { ...data, employerName, sickLeave, type};
    } else if  (type === 'HealthCheck') {
      const { healthCheckRating } = values;
      result = {...data, healthCheckRating, type};
    }

    if(!result){
      throw new Error('Input error');
    }

    return result;
  };

  const submitNewEntry = async(values: EntryFormValues) => {
    try {
      const data = parseFields(values);
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${String(id)}/entries`,
        data
      );
      console.log(newEntry);
      dispatch(addEntry(String(id), newEntry));
      closeModal();
    }catch(e:unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(String(e?.response?.data?.error) || "Unrecognized axios error");
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };



  const { name,
         occupation,
         ssn,
         entries
        } = patient[id ? id : ''];

  return (
    <div>
      <h2>{name}</h2>
      <p>ssh: {ssn}</p>
      <p>occupation: {occupation}</p>
      <section>
        <h3>entries</h3>
        {entries.map(entry => <EntryLine key={entry.id} entry={entry}  />)}
      </section>
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add Medical Entry
      </Button>
    </div>
  );
};

export default PatientPage;