import patientData from "../../data/patients";
import { NewPatient, PublicPatient, Patient, Entry, EntryWithoutId } from "../types";
import  {v1 as uuid } from "uuid";

const patients: Patient[] = patientData;

const getPublicPatients = (): PublicPatient[] => {
  const PublicPatient = patients.map(({id, name, dateOfBirth, gender, occupation}) => {
    return {
      id: id,
      name: name,
      dateOfBirth: dateOfBirth,
      gender: gender,
      occupation: occupation,
    };
  });
  return PublicPatient;
};

const getFullPatient = (id: string): Patient | undefined => {
  const patient = patientData.find(p => p.id === id);
  return patient;
};

const addPatient = (data: NewPatient): Patient => {
  console.log(data);
  const patient = {
    ...data,
    id: uuid()
  } as Patient;
  patients.push(patient);
  return patient;
};

const addEntry = (patientId: string, entry: EntryWithoutId): Patient | undefined => {
  const patient = getFullPatient(patientId);
  if (patient !== undefined) {
    const newEntry: Entry = {...entry, id: uuid()};
    const patientWithEntry: Patient = {
      ...patient, 
      entries: patient?.entries.concat(newEntry)
    };
    patients.forEach(p => {
      if (p.id === patient.id) {
        p.entries.push(newEntry);
      }
    }
  );
  return patientWithEntry;
  }
  return undefined;
};

export default {
  getPublicPatients,
  addPatient,
  getFullPatient,
  addEntry
};