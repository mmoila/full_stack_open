import React from "react";

import { Moment } from "moment";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';



export const DateField = () => {
  const [value, setValue] = React.useState<Moment | null>(null);

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DatePicker
        label="Select date"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={() => null}
      />
    </LocalizationProvider>
  );
};