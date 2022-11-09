"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (gender) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(types_1.Gender).includes(gender);
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntry = (entry) => {
    const types = ["HealthCheck", "OccupationalHealthcare", "Hospital"];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return 'type' in entry && types.includes(entry.type);
};
/*
const isStringArray = (array: unknown): array is Array<string> => {
  return (Array.isArray(array) && array.find(x => !isString(x)) === undefined);
};
*/
const isEntryArray = (array) => {
    return Array.isArray(array) && array.find(x => !isEntry(x)) === undefined;
};
const parseDate = (date) => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};
const parseGender = (gender) => {
    if (!gender || !isGender(gender)) {
        throw new Error("Incorrect or missing gender: " + gender);
    }
    return gender;
};
const parseName = (name) => {
    if (!name || !isString(name)) {
        throw new Error("Incorrect or missin name: " + name);
    }
    return name;
};
const parseSsn = (ssn) => {
    if (!ssn || !isString(ssn)) {
        throw new Error("Incorrect or missing ssn: " + ssn);
    }
    return ssn;
};
const parseOccupation = (occupation) => {
    if (!occupation || !isString(occupation)) {
        throw new Error("Incorrect or missing occupation: " + occupation);
    }
    return occupation;
};
const parseEntries = (entries) => {
    if (!isEntryArray(entries)) {
        throw new Error("Incorrect or missing entries: " + entries);
    }
    return entries;
};
const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation, entries }) => {
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
exports.default = toNewPatient;
