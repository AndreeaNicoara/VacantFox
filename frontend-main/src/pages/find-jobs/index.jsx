import { Suspense, useState } from 'react';
import { ViewList, ViewModule } from '@mui/icons-material';
import {
   Container,
   MenuItem,
   Stack,
   TextField,
   ToggleButton,
   ToggleButtonGroup,
   Typography,
} from '@mui/material';
import Header from './components/Header';
import Jobs from './components/Jobs';
import { getFormEntries, getSearchQueries } from 'utils';
import Loading from 'components/Loading';
import { useSearchParams } from 'react-router-dom';

export default function FindJobs() {
   const [searchParams] = useSearchParams();
   const searchQueries = getSearchQueries(searchParams);
   const [filters, setFilters] = useState(searchQueries);

   /**
    * @param {React.ChangeEvent<HTMLInputElement>} e
    */
   function handleSubmit(e) {
      e.preventDefault();
      const formEntries = getFormEntries(e.currentTarget);

      setFilters(formEntries);
   }

   return (
      <form onSubmit={handleSubmit}>
         <Header initialFilters={filters} />

         <Container>
            <Stack
               direction='row'
               justifyContent='space-between'
               alignItems='center'
            >
               <Stack gap={2}>
                  <Typography variant='h4' mb={-1}>
                     Relevant Jobs
                  </Typography>

                  <Typography variant='subtitle1'>
                     Showing lots of result
                  </Typography>
               </Stack>

               <Stack direction='row' gap={1.5} alignItems='center'>
                  <Typography variant='subtitle1'>Sort by:</Typography>

                  <TextField
                     size='small'
                     select
                     defaultValue='Most Relevent'
                     name='sortBy'
                  >
                     <MenuItem value='Most Relevent'>Most Relevant</MenuItem>
                     <MenuItem value='Best Match'>Best Match</MenuItem>
                     <MenuItem value='Top Paying'>Top Paying</MenuItem>
                  </TextField>

                  <Typography color='GrayText'>{`|`}</Typography>

                  <ToggleButtonGroup value='list'>
                     <ToggleButton value='list'>
                        <ViewList />
                     </ToggleButton>
                     <ToggleButton value='grid'>
                        <ViewModule />
                     </ToggleButton>
                  </ToggleButtonGroup>
               </Stack>
            </Stack>

            {/* premature optimization! */}
            <Suspense fallback={<Loading />}>
               <Jobs filters={filters} />
            </Suspense>
         </Container>
      </form>
   );
}
