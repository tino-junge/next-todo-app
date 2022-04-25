import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import startOfToday from 'date-fns/startOfToday';
import * as React from 'react';

interface DateTimePickerProps {
  date: Date | null;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
}

export default function DatePicker(props: DateTimePickerProps) {
  return (
    <Box my={3}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateTimePicker
          renderInput={(params) => <TextField {...params} />}
          label="Due date"
          value={props.date}
          onChange={(newDate: Date | null) => {
            if (!newDate) return;
            props.setDate(newDate);
          }}
          minDateTime={startOfToday()}
        />
      </LocalizationProvider>
    </Box>
  );
}
