import * as React from 'react';
import dayjs from 'dayjs';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';

const isWeekend = (date) => {
  const day = date.day();

  return day === 0 || day === 6;
};

export default function ResponsiveDateTimePickers() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticDateTimePicker
        minDate={dayjs()}
        defaultValue={dayjs()}
        displayPast
        shouldDisableDate={isWeekend}
        minutesStep={30}
        orientation='landscape'
        slotProps={{
          actionBar: {
            actions: ['clear','accept'],
          },
          toolbar: {
            // Customize value display
            toolbarFormat: 'YYYY',
            // Change what is displayed given an empty value
            toolbarPlaceholder: '??',
            // Show the toolbar
            hidden: false,
            }
          }
        }
        />
    </LocalizationProvider>
  );
}