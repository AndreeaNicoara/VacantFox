import { ArrowForward } from '@mui/icons-material';
import { Button, Stack, styled, Typography } from '@mui/material';
import Section from 'components/Section';
import { Link } from 'react-router-dom';

export default function PageSegment(props) {
   return (
      <Root>
         <Stack direction='row' justifyContent='space-between'>
            <Typography variant='h3'>
               {props.title.split(' ').slice(0, 2).join(' ')}

               <Typography
                  sx={{ display: 'inline' }}
                  variant='inherit'
                  color='secondary'
               >
                  {` `}
                  {props.title.split(' ')[2]}
               </Typography>
            </Typography>

            <Button component={Link} to='/find-jobs' endIcon={<ArrowForward />}>
               Show all Jobs
            </Button>
         </Stack>

         {props.children}
      </Root>
   );
}

const Root = styled(Section)(({ theme }) => ({
   display: 'flex',
   flexDirection: 'column',
   gap: theme.spacing(3),
}));
