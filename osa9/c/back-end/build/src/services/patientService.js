"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../../data/patients"));
const uuid_1 = require("uuid");
const patients = patients_1.default;
const getPublicPatients = () => {
    const PublicPatient = patients.map(({ id, name, dateOfBirth, gender, occupation }) => {
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
const getFullPatient = (id) => {
    const patient = patients_1.default.find(p => p.id === id);
    return patient;
};
const addPatient = (data) => {
    console.log(data);
    const patient = Object.assign(Object.assign({}, data), { id: (0, uuid_1.v1)() });
    patients.push(patient);
    return patient;
};
const addEntry = (patientId, entry) => {
    const patient = getFullPatient(patientId);
    const newEntry = Object.assign(Object.assign({}, entry), { id: (0, uuid_1.v1)() });
    const patientWithEntry = Object.assign(Object.assign({}, patient), { entries: patient === null || patient === void 0 ? void 0 : patient.entries.push(newEntry) });
    return patientWithEntry;
};
exports.default = {
    getPublicPatients,
    addPatient,
    getFullPatient
};
