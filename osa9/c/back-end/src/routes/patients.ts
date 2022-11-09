import express from "express";
import patientService from "../services/patientService";
import { Entry } from "../types";
import {toNewPatient, toNewEntry} from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getPublicPatients());
});

router.get("/:id", (req, res) => {
  const patient = patientService.getFullPatient(req.params.id);
  if (patient === undefined) {
    res.status(404).send("User not found");
  }
  res.send(patient);
});

router.post("/", (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatient = toNewPatient({...req.body, entries: []});
    const returnedPatient = patientService.addPatient(newPatient);
    res.send(returnedPatient);

  } catch (error) {
    let message = "Something went wrong: ";
    if (error instanceof Error) {
      message += error.message;
    }
    res.status(404).send(message);
  }
});

router.post("/:id/entries", (req, res) => {
  try {
    const entry: Entry = toNewEntry(req.body);
    const patient = patientService.addEntry(req.params.id, entry);
    res.send(patient);
  } catch (error) {
    let message = "Something went wrong: ";
    if (error instanceof Error) {
      message += error.message;
    }
    res.status(404).send(message);
  }
});

export default router;