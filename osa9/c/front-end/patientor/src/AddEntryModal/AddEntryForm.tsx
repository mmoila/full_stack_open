//import React from "react";
import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";

import { TextField } from "../AddPatientModal/FormField";
import { DateField } from "./FormField";

//import { Entry } from "../types";

interface Props {
  onSubmit: () => void;
  onCancel: () => void;
}

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  return (
    <Formik
      initialValues={{
        type: "",
        date: "",
        specialist: "",
        diagnosisCodes: "",
        healthCheckRating: ""
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.type) {
          errors.type = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.diagnosisCodes) {
          errors.diagnosisCodes = requiredError;
        }
        if (!values.healthCheckRating) {
          errors.healthCheckRating = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty }) => {
        return (
          <Form className="form ui">
            <Field
              label="Type"
              placeholder="Type"
              name="type"
              component={null}
            />
            <Field
              label="Date"
              placeholder="Date"
              component={DateField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="DiagnosisCodes"
              placeholder="DiagnosisCodes"
              name="diagnosisCodes"
              component={null}
            />
            <Field
              label="HealthCheckRating"
              placeholder="HealthCheckRating"
              name="healthCheckRating"
              component={null}
            />
          <Grid>
            <Grid item>
              <Button
                color="secondary"
                variant="contained"
                style={{ float: "left" }}
                type="button"
                onClick={onCancel}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                style={{ float: "right" }}
                type="submit"
                disabled={!dirty || !isValid}
              >
                Add entry
              </Button>
            </Grid>
          </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;