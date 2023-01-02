import { Box, CircularProgress } from '@mui/material';

export default function Loading(props) {
   return (
      <Box
         sx={{
            width: '100%',
            height: 'inherit',
            display: 'flex',
            justifyContent: 'center',
            p: 4,
            ...(props.full && {
               height: '90vh',
               alignItems: 'center',
            }),
         }}
      >
         <CircularProgress disableShrink />
      </Box>
   );
}
