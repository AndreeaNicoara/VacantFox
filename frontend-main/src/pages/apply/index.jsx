import R from 'react';
import Section from 'components/Section';
import { Suspense } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import {
   Button,
   Container,
   Paper,
   Stack,
   MobileStepper as Stepper,
   styled,
   Typography,
   Box,
   CircularProgress,
} from '@mui/material';
import ContactInfo from './components/ContactInfo';
import { getFormEntries } from 'utils';
import UploadResume from './components/UploadResume';
import Questions from './components/Questions';
import PreviousJob from './components/PreviousJob';
import Review from './components/Review';
import useSWR, { preload } from 'swr';
import fetcher, { axios } from 'api/fetcher';
import { Done } from '@mui/icons-material';
import { useAuth } from 'store/auth/provider';
import Loading from 'components/Loading';
import LoadingButton from 'components/LoadingButton';

const steps = [1, 2, 3, 4, 5];
const forms = [ContactInfo, UploadResume, Questions, PreviousJob, Review];

export default function Apply() {
   const params = useParams();
   const auth = useAuth();

   /**
    * @type {{ data: {
    * first_name: string,
    * last_name: string,
    * email: string,
    * phone: string,
    * city: string,
    * resume: File,
    * questions: {[key: string]: string},
    * prev_job: {
    *  job_title: string,
    *  location: string,
    * }
    * }}} data
    */
   const { data: profile } = useSWR(`/profile/${auth.user.id}`);
   const { data: job } = useSWR(`/job/${params.slug}`);

   const [allFields, setFields] = R.useState(profile);
   const [activeStep, setActiveStep] = R.useState(0);
   const [applied, setApplied] = R.useState(false);
   const [pending, setPending] = R.useState(false);

   const lastStep = activeStep === steps.length - 1;

   function handleSubmit(e) {
      e.preventDefault();
      const entries = getFormEntries(e.currentTarget);

      submit({
         ...entries,
         prev_job: {
            title: entries.prev_job_title,
            location: entries.prev_job_location,
         },
         prev_job_title: undefined,
         prev_job_location: undefined,
      });

      if (lastStep) {
         return handleApply();
      }

      handleNext();
   }

   function submit(entry) {
      setFields({
         ...allFields,
         ...entry,
      });
   }

   function handleApply() {
      setApplied('loading');

      const data = {
         ...allFields,
         slug: params.slug,
         job_id: String(job.id),
      };

      const config = {
         headers: {
            Authorization: `Bearer ${auth.user.token}`,
         },
      };

      axios
         .post('/apply', data, config)
         .then(res => {
            setApplied('success');

            preload(`/profile/${auth.user.id}`, url =>
               fetcher(url, {
                  headers: { Authorization: `Bearer ${auth.user.token}` },
               })
            );
         })
         .catch(error => {
            setApplied(false);
            alert(error.message);
         });
   }

   const handleNext = () => {
      setActiveStep(prevActiveStep => prevActiveStep + 1);
   };

   const handleBack = () => {
      setActiveStep(prevActiveStep => prevActiveStep - 1);
   };

   const StepView = forms[activeStep];

   const Wrapper = props => (
      <Container component={Section}>
         <Root>
            {props.children}

            <Suspense fallback={<Loading />}>
               <Outlet />
            </Suspense>
         </Root>
      </Container>
   );

   if (applied === 'loading')
      return (
         <Wrapper>
            <Box width={460} fontSize={48} py={20} color='green'>
               <Stack alignItems='center' justifyContent='center'>
                  <CircularProgress fontSize='inherit' />
               </Stack>
            </Box>
         </Wrapper>
      );

   if (applied)
      return (
         <Wrapper>
            <Box width={460} fontSize={48} py={20} color='green'>
               <Stack alignItems='center' justifyContent='center'>
                  <Done fontSize='inherit' />
                  <Typography variant='h4'>Applied</Typography>
               </Stack>
            </Box>
         </Wrapper>
      );

   return (
      <Wrapper>
         <Stack component='form' onSubmit={handleSubmit} pr={3}>
            <Stack sx={{ span: { width: '100%' } }}>
               <Typography>
                  Application step {steps[activeStep]} of {steps.length}
               </Typography>

               <Stepper
                  position='static'
                  variant='progress'
                  steps={5}
                  activeStep={activeStep}
                  sx={{ flexGrow: 1 }}
               />
            </Stack>

            <Box width={460}>
               <StepView
                  fields={allFields}
                  submit={submit}
                  setPending={setPending}
               />
            </Box>

            <Stack direction='row' gap={2} sx={{ py: 3 }}>
               <Button variant='outlined' onClick={handleBack} fullWidth>
                  Back
               </Button>

               <LoadingButton
                  variant='contained'
                  type='submit'
                  fullWidth
                  loading={pending}
               >
                  {lastStep ? 'Submit' : 'Continue'}
               </LoadingButton>
            </Stack>
         </Stack>
      </Wrapper>
   );
}

const Root = styled(Paper)(({ theme }) => ({
   display: 'flex',
   padding: theme.spacing(2),
}));
