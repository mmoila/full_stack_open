"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const utils_1 = __importDefault(require("../utils"));
const router = express_1.default.Router();
router.get("/", (_req, res) => {
    res.send(patientService_1.default.getPublicPatients());
});
router.get("/:id", (req, res) => {
    const patient = patientService_1.default.getFullPatient(req.params.id);
    if (patient === undefined) {
        res.status(404).send("User not found");
    }
    res.send(patient);
});
router.post("/", (req, res) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const newPatient = (0, utils_1.default)(Object.assign(Object.assign({}, req.body), { entries: [] }));
        const returnedPatient = patientService_1.default.addPatient(newPatient);
        res.send(returnedPatient);
    }
    catch (error) {
        let message = "Something went wrong: ";
        if (error instanceof Error) {
            message += error.message;
        }
        res.status(404).send(message);
    }
});
exports.default = router;
