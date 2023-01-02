import { styled } from '@mui/material';
import { Suspense } from 'react';
import useSWR from 'swr';
import PageSegment from './PageSegment';
import JobCard from 'components/JobCard';
import Loading from 'components/Loading';

export default function LatestJobs() {
   const { data: latestJobs } = useSWR('/jobs');

   return (
      <PageSegment title='Latest Open Jobs' action='Show all Jobs'>
         <Suspense fallback={<Loading />}>
            <Grid>
               {latestJobs.map(item => (
                  <JobCard key={item.id} {...item} />
               ))}
            </Grid>
         </Suspense>
      </PageSegment>
   );
}

const Grid = styled('div')(({ theme }) => ({
   display: 'grid',
   gridTemplateColumns: 'repeat(2, 1fr)',
   gap: theme.spacing(2),
}));
