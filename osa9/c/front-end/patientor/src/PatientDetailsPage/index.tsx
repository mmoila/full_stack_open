import { setPatient, useStateValue } from "../state";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Diagnosis, Patient } from "../types";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import Entries from "./Entries";

import { Button } from "@material-ui/core";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import AddEntryModal from "../AddEntryModal";


const PatientDetailsPage = () => {
  const [{ patientDetails }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };
  
  const getDetails = async (id: string) => {
    try {
      let {data: patient} = await axios
        .get<Patient>(`${apiBaseUrl}/patients/${id}`);
      const {data: diagnoses} = await (axios
        .get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`));

      patient = {
        ...patient, 
        entries: patient.entries.map(
          e => ({...e, diagnosisCodes: e.diagnosisCodes?.map(
            d => {
              const diag = diagnoses.find(di => di.code === d);
              if (diag === undefined) {
                return d;
              }
              return (diag.code + " " + diag.name);
            }
          )})
        )};

      dispatch(setPatient(patient));

    } catch(e) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        console.log((String(e?.response?.data?.error) || "Unrecognized axios error"));
      } else {
        console.error("Unknown error", e);
        console.log(("Unknown error"));
      }
    }
  };

  if (id !== undefined && (patientDetails === null || patientDetails.id !== id)) {
    void getDetails(id);
  }

  const getGender = (gender: string) => {
    switch(gender) {
      case "male":
        return <MaleIcon />;
      case "female":
        return <FemaleIcon />;
      default:
        return null;
    }
  };

  const submitNewEntry = () => {
    console.log("submitting new entry");
  };

  return (
    <div>
      {patientDetails 
      ?
      <>
        <h2>{patientDetails.name} {getGender(patientDetails.gender)}</h2>
        <p>ssn: {patientDetails.ssn}</p>
        <p>occupation: {patientDetails.occupation}</p>
        <AddEntryModal 
          modalOpen={modalOpen} 
          onClose={closeModal} 
          onSubmit={submitNewEntry}
          error={error}
        />
        <Entries patientDetails={patientDetails} />
        <Button variant="outlined" onClick={openModal}>add new entry</Button>
      </>
      :
      null
      }
    </div>
    
  );
};

export default PatientDetailsPage;