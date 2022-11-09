import { Gender, NewPatient, Entry } from "./types";


const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (gender: any): gender is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(gender);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntry = (entry: any): entry is Entry => {
  const basicFields = ["description", "date", "specialist"];
  const healthCheckFields = ["healthCheckRating"];
  const occupationalFields = ["employerName"];
  const hospitalFields = ["discharge"];
  
  if ("type" in entry) {
    switch (entry.type) {
      case "HealthCheck": 
        return basicFields.every(x => x in entry) 
          && healthCheckFields.every(x => x in entry);
      case "OccupationalHealthcare":
        return basicFields.every(x => x in entry) 
          && occupationalFields.every(x => x in entry);
      case "Hospital":
        const value = basicFields.every(x => x in entry) 
          && hospitalFields.every(x => x in entry);
        return value;
      default:
        return false;
    }
  }
  return false;
  
};

const isEntryArray = (array: unknown): array is Array<Entry> => {
  return Array.isArray(array) && array.find(x => !isEntry(x)) === undefined;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};


const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missin name: " + name);
  }
  return name;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error("Incorrect or missing ssn: " + ssn);
  }
  return ssn;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error("Incorrect or missing occupation: " + occupation);
  }
  return occupation;
};

const parseEntries = (entries: unknown): Entry[] => {
  if (!isEntryArray(entries)) {
    throw new Error("Incorrect or missing entries: " + entries);
  }
  return entries;
};

type Fields = {
  name: unknown,
  dateOfBirth: unknown,
  ssn: unknown,
  gender: unknown,
  occupation: unknown,
  entries: unknown
};

export const toNewPatient = ({name, dateOfBirth, ssn, gender, occupation, entries}: Fields): NewPatient => {
  const patient = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: parseEntries(entries),
  };
  return patient;
};

export const toNewEntry = (entry: unknown): Entry => {
  if (!isEntry(entry)) {
    throw new Error("Incorrect or missing entry: " + entry);
  }
  return entry;
};


