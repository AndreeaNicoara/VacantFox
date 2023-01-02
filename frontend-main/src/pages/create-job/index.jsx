import {
   Box,
   Button,
   Container,
   MenuItem,
   OutlinedInput,
   Stack,
   styled,
   TextField,
   Typography,
} from '@mui/material';
import useSWR, { preload } from 'swr';
import { Link } from 'react-router-dom';
import fetcher, { axios } from 'api/fetcher';
import Section from 'components/Section';
import { createSlug, getFormEntries } from 'utils';
import { useAuth } from 'store/auth/provider';
import { useState } from 'react';
import { ArrowForward, Done } from '@mui/icons-material';
import LoadingButton from 'components/LoadingButton';

export default function CreateJob() {
   const { user } = useAuth();
   // const { data: profile } = useSWR(`/profile/${user.id}`);
   const [created, setCreated] = useState('');
   const [file, setFile] = useState(user.avatar);

   function handleChange(e) {
      const data = e.target.files[0];

      const config = {
         headers: {
            Authorization: `Bearer ${user.token}`,
            'Content-Type': `multipart/form-data; boundary=${Math.random()
               .toString()
               .substr(2)}`,
         },
      };

      axios.post('/upload', { data }, config).then(res => {
         setFile(`${process.env.REACT_APP_API}/${res.data}`);
      });
   }

   async function handleSubmit(e) {
      e.preventDefault();
      const entries = getFormEntries(e.currentTarget);

      const job = {
         ...entries,
         avatar: file,
         category: entries.categories,
         slug: createSlug(
            entries.company,
            entries.location,
            entries.jobTitle,
            entries.employmentType,
            entries.jobType
         ),
      };

      setCreated('pending');

      try {
         const { data } = await axios.post('/createjob', job, {
            headers: { Authorization: `Bearer ${user.token}` },
         });

         setCreated(data.data.slug);

         preload(`/job/${data.data.slug}`, fetcher);
         preload(`/profile/${user.id}`, url =>
            fetcher(url, {
               headers: { Authorization: `Bearer ${user.token}` },
            })
         );
      } catch (error) {
         setCreated('');
         throw new Error(error);
      }
   }

   if (created && created !== 'pending')
      return (
         <Container component={Section}>
            <Box
               fontSize={48}
               color='green'
               minHeight='80vh'
               display='flex'
               justifyContent='center'
            >
               <Stack alignItems='center' justifyContent='center' gap={2}>
                  <Done fontSize='inherit' />
                  <Typography variant='h4'>
                     Your Job Created Successfully!
                  </Typography>

                  <Button
                     size='large'
                     component={Link}
                     to={`/${created}`}
                     endIcon={<ArrowForward />}
                  >
                     View Job
                  </Button>
               </Stack>
            </Box>
         </Container>
      );

   return (
      <Container component={Section}>
         <Typography fontSize={28} frontWeight='600' mb={3}>
            Create a Job
         </Typography>

         <Stack component='form' onSubmit={handleSubmit} gap={3}>
            <Stack direction='row' gap={3}>
               <Stack flex={1} gap={3}>
                  <TextField
                     label='Company Name'
                     name='company'
                     required
                     defaultValue={user.company}
                  />

                  <Stack
                     direction='row'
                     gap={2}
                     alignItems='center'
                     justifyContent='space-between'
                  >
                     <Typography component='label' htmlFor='upload'>
                        Company Logo*
                     </Typography>

                     <OutlinedInput
                        id='upload'
                        type='file'
                        accept='image/*'
                        required
                        onChangeCapture={handleChange}
                     />
                  </Stack>

                  <TextField label='Job Title' name='jobTitle' required />

                  <TextField select label='Job Type' name='jobType' required>
                     <MenuItem value='Full Time'>Full Time</MenuItem>
                     <MenuItem value='Part Time'>Part Time</MenuItem>
                     <MenuItem value='Internship'>Internship</MenuItem>
                  </TextField>

                  <TextField select label='Job Level' name='jobLevel' required>
                     <MenuItem value='Junior'>Junior</MenuItem>
                     <MenuItem value='Senior'>Senior</MenuItem>
                     <MenuItem value='Manager'>Manager</MenuItem>
                  </TextField>

                  <TextField
                     select
                     label='Employment Type'
                     name='employmentType'
                     required
                  >
                     <MenuItem value='On-site'>On-site</MenuItem>
                     <MenuItem value='Remote'>Remote</MenuItem>
                     <MenuItem value='Hybrid'>Hybrid</MenuItem>
                  </TextField>

                  <TextField label='Location' name='location' required />

                  <TextField
                     select
                     label='Experience'
                     name='experience'
                     required
                  >
                     <MenuItem value='1-2 Years'>1-2 Years</MenuItem>
                     <MenuItem value='2-3'>2-3 Years</MenuItem>
                     <MenuItem value='4+'>4+ Years</MenuItem>
                  </TextField>

                  <TextField label='Salary Range' name='salary' required />

                  <TextField
                     select
                     label='Categories'
                     name='categories'
                     required
                  >
                     {categories.map(item => (
                        <MenuItem key={item} value={item}>
                           {item}
                        </MenuItem>
                     ))}
                  </TextField>
               </Stack>

               <DescriptionField
                  multiline
                  label='Description'
                  name='description'
                  placeholder='HTML Supported!'
                  required
               />
            </Stack>

            <LoadingButton
               loading={created === 'pending'}
               variant='contained'
               type='submit'
               fullWidth
               size='large'
            >
               Submit
            </LoadingButton>
         </Stack>
      </Container>
   );
}

const DescriptionField = styled(TextField)({
   flex: 1,

   '.MuiInputBase-root': {
      height: '100% !important',
   },

   textarea: {
      height: '100% !important',
      overflow: 'auto !important',
   },
});

const categories = [
   'Design',
   'Sales',
   'Marketing',
   'Finance',
   'Technology',
   'Engineering',
   'Business',
   'Human Resource',
];
