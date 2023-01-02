import { useParams } from 'react-router-dom';
import { Suspense } from 'react';
import { FiberManualRecord } from '@mui/icons-material';
import {
   Box,
   Container,
   Divider,
   Paper,
   Stack,
   styled,
   Typography,
} from '@mui/material';
import fetcher, { localFetcher } from 'api/fetcher';
import useSWR from 'swr';
import Loading from 'components/Loading';

/**
 * @param {{children?: JSX.Element}} props
 */
export default function JobsDetails(props) {
   const params = useParams();

   /**
    * @type {{ data: {
    * jobTitle: string,
    * company: string,
    * location: string,
    * jobType: string,
    * experience: string,
    * employmentType: string,
    * salary: string
    * }}} data
    */

   const { data: job } = useSWR(`/job/${params.slug}`);

   return (
      <Root component={Container}>
         <img src='/assets/job-cover.svg' alt='cover art' />

         <Suspense fallback={<Loading />}>
            <Stack direction='row' justifyContent='space-between'>
               <Stack gap={2} py={3}>
                  <Typography variant='h4' fontWeight='600'>
                     {job.jobTitle}
                  </Typography>

                  <Typography
                     variant='body1'
                     color='textSecondary'
                     display='flex'
                     alignItems='center'
                     gap={1.5}
                  >
                     {job.company}{' '}
                     <FiberManualRecord sx={{ fontSize: '8px' }} />{' '}
                     {job.location}
                  </Typography>
               </Stack>

               {props.children}
            </Stack>

            <Divider sx={{ mb: 3 }} />

            <Grid>
               <InfoCard label='Job Type'>{job.jobType}</InfoCard>
               <InfoCard label='Experience'>{job.experience}</InfoCard>
               <InfoCard label='Employment'>{job.employmentType}</InfoCard>
               <InfoCard label='Salary'>{job.salary}</InfoCard>
            </Grid>

            <Divider sx={{ my: 3 }} />

            <Box
               component='article'
               py={1}
               dangerouslySetInnerHTML={{
                  __html: job.description,
               }}
            />
         </Suspense>
      </Root>
   );
}

function InfoCard({ label, children }) {
   return (
      <Paper
         elevation={0}
         sx={{ p: 2, bgcolor: '#F9F6FF', textAlign: 'center' }}
      >
         <Stack>
            <Typography fontSize={24} fontWeight='600'>
               {children}
            </Typography>
            <Typography variant='subtitle1' color='textSecondary'>
               {label}
            </Typography>
         </Stack>
      </Paper>
   );
}

const Grid = styled('div')(({ theme }) => ({
   display: 'grid',
   gap: theme.spacing(2),
   gridTemplateColumns: 'repeat(4, 1fr)',
}));

const Root = styled(Paper)(({ theme }) => ({
   paddingTop: theme.spacing(2),
   paddingBottom: theme.spacing(2),
   width: '100%',

   img: {
      width: '100%',
   },
}));

// TODO: should be customized globally in theme
Root.defaultProps = {
   variant: 'outlined',
};
