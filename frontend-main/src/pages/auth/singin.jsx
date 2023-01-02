import { useState } from 'react';
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
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from 'store/auth/provider';
import OAuth from './components/OAuth';
import { axios } from 'api/fetcher';
import { getFormEntries } from 'utils';
import LoadingButton from 'components/LoadingButton';

export default function SignIn() {
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

      setLoading(true);

      axios
         .post('/login', entries)
         .then(res => {
            auth.signin(res.data, () => {
               setLoading(false);
               navigate(from, { replace: true });
            });
         })
         .catch(error => {
            setLoading(false);
            throw new Error(error);
         });
   }

   return (
      <LoginForm>
         <Typography variant='h4' mb={4}>
            Welcome Back
         </Typography>

         <OAuth />

         <Divider sx={{ py: 2 }}>or</Divider>

         <Stack spacing={2} component='form' onSubmit={handleSubmit}>
            <Stack spacing={2}>
               <TextField
                  fullWidth
                  type='email'
                  label='Email Address'
                  name='email'
                  required
               />
               <TextField
                  fullWidth
                  type='password'
                  label='Password'
                  name='password'
                  required
               />
            </Stack>

            <Stack
               direction='row'
               alignItems='center'
               justifyContent='space-between'
            >
               <MuiLink flexShrink={0} mr={4}>
                  Forgot Password?
               </MuiLink>

               <LoadingButton
                  type='submit'
                  variant='contained'
                  fullWidth
                  loading={loading}
               >
                  Sign in
               </LoadingButton>
            </Stack>

            <Typography pt={4}>
               New to JobSearch?{' '}
               <MuiLink component={Link} to='/register'>
                  Sign Up
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
