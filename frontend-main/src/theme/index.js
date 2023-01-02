import { createTheme } from '@mui/material';

const theme = createTheme({
   typography: {
      fontFamily: 'Epilogue, arial, sans-serif',
   },
   palette: {
      background: {
         default: '#F9F6FF',
      },
      primary: {
         main: '#6419FF',
         light: '#6419FF',
      },
   },
});

export default theme;
