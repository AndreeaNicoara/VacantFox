import {
   Button,
   CircularProgress,
   Divider,
   Link as MuiLink,
   Stack,
   TextField,
   Typography,
} from '@mui/material';
import { styled } from '@mui/system';
import OAuth from './components/OAuth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { axios } from 'api/fetcher';
import { getFormEntries } from '../../utils';
import { useAuth } from 'store/auth/provider';
import { useState } from 'react';
import LoadingButton from 'components/LoadingButton';

export default function Register() {
   const auth = useAuth();
   const navigate = useNavigate();
   const location = useLocation();
   const [loading, setLoading] = useState(false);

   const from = location.state?.from?.pathname || '/';

   /**
    * @param {React.ChangeEvent<HTMLInputElement>} e
    */
   function handleSubmit(e) {
      e.preventDefault();
      const entries = getFormEntries(e.currentTarget);

      if (entries.password !== entries.password_confirmation) {
         return alert('Passwords do not match');
      }

      setLoading(true);

      axios
         .post('/register', entries)
         .then(res => {
            auth.signin(res.data, () => {
               setLoading(false);
               navigate(from, { replace: true });
            });
         })
         .catch(error => {
            setLoading(false);

            if (error.response?.data?.message?.includes('email has already')) {
               setLoading(false);
               return alert("You've already registered, Please Sign In!");
            }

            throw new Error(error);
         });
   }

   return (
      <LoginForm>
         <Typography variant='h4' mb={4}>
            Create an Account
         </Typography>

         <OAuth />

         <Divider sx={{ py: 2 }}>or</Divider>

         <Stack spacing={2} component='form' onSubmit={handleSubmit}>
            <Stack spacing={2}>
               <Stack direction='row' spacing={2}>
                  <TextField
                     fullWidth
                     label='First Name'
                     name='first_name'
                     required
                  />
                  <TextField
                     fullWidth
                     label='Last Name'
                     name='last_name'
                     required
                  />
               </Stack>

               <TextField
                  fullWidth
                  label='Email Address'
                  name='email'
                  required
               />
               <TextField
                  type='password'
                  label='Password'
                  name='password'
                  required
                  fullWidth
               />

               <TextField
                  type='password'
                  label='Re-type Password'
                  name='password_confirmation'
                  required
                  fullWidth
               />
            </Stack>

            <LoadingButton
               type='submit'
               variant='contained'
               fullWidth
               loading={loading}
            >
               Register
            </LoadingButton>

            <Typography pt={4}>
               Already have an account?{' '}
               <MuiLink component={Link} to='/signin'>
                  Sign In
               </MuiLink>
            </Typography>
         </Stack>
      </LoginForm>
   );
}

const LoginForm = styled('div')(({ theme }) => ({
   display: 'flex',
   flexDirection: 'column',
}));
