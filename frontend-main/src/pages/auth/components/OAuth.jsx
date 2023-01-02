import { Facebook, Google } from '@mui/icons-material';
import { Button, IconButton, Stack } from '@mui/material';

export default function OAuth() {
   return (
      <Stack direction='row' spacing={1.5}>
         <Button
            variant='contained'
            fullWidth
            endIcon={<Google sx={{ ml: 6, color: 'white' }} />}
         >
            Continue with Google
         </Button>

         <IconButton
            sx={{
               bgcolor: theme => theme.palette.primary.main,
               color: 'white',
            }}
         >
            <Facebook />
         </IconButton>
      </Stack>
   );
}
