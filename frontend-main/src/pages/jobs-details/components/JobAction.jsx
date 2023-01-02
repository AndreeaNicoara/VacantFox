import { FavoriteBorder } from '@mui/icons-material';
import { Button, IconButton, Stack } from '@mui/material';
import { Link, useParams } from 'react-router-dom';

export default function JobAction() {
   const params = useParams();

   return (
      <Stack direction='row' gap={1.5} alignItems='center'>
         <IconButton size='large'>
            <FavoriteBorder />
         </IconButton>

         <Button
            size='large'
            variant='contained'
            component={Link}
            to={`/apply/${params.slug}`}
            preventScrollReset={false}
         >
            Apply Now
         </Button>
      </Stack>
   );
}
