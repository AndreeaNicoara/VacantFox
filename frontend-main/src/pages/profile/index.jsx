import useSWR from 'swr';
import { axios } from 'api/fetcher';
import ContactInformation from './components/ContactInformation';
import {
   Button,
   Container,
   Paper,
   Stack,
   styled,
   Typography,
} from '@mui/material';
import Location from './components/Location';
import Resume from './components/Resume';
import Nav from './components/Nav';
import Section from 'components/Section';
import { useAuth } from 'store/auth/provider';
import { useNavigate } from 'react-router-dom';
import { ExitToApp } from '@mui/icons-material';

export default function Profile() {
   const auth = useAuth();
   const navigate = useNavigate();
   const { data: profile } = useSWR(`/profile/${auth.user.id}`, {
      // instant loading
      fallbackData: auth.user,
   });
   const name = profile.first_name + ' ' + profile.last_name;
   const username = profile.email?.split('@')[0];

   function handleLogout() {
      navigate('/');
      auth.signout();

      axios
         .post('/logout', null, {
            headers: { Authorization: `Bearer ${auth.user.token}` },
         })
         .catch(error => {
            console.error(error);
            alert('Failed to signout :)');
         });
   }

   return (
      <Container component={Section}>
         <Root>
            <Paper className='sidebar'>
               <Stack
                  alignItems='center'
                  justifyContent='center'
                  gap={1}
                  py={4}
               >
                  <ProfilePic>
                     <img
                        src={profile.image || profile.avatar || '/logo.svg'}
                        alt='user avatar'
                     />
                  </ProfilePic>

                  <Typography
                     fontSize={24}
                     fontWeight={600}
                     letterSpacing={1.5}
                  >
                     {name}
                  </Typography>

                  <Typography variant='subtitle2' color='textSecondary'>
                     {username}
                  </Typography>
               </Stack>

               <Nav />

               <LogoutButton onClick={handleLogout}>Log Out</LogoutButton>
            </Paper>

            <Paper className='content'>
               <Stack gap={2}>
                  <Typography fontSize={28} frontWeight='600'>
                     My Profile
                  </Typography>

                  <ContactInformation name={name} email={profile.email} />

                  <Location location={profile.city} />

                  <Resume file={profile.resume} />
               </Stack>
            </Paper>
         </Root>
      </Container>
   );
}

const Root = styled('div')(({ theme }) => ({
   display: 'flex',
   gap: theme.spacing(2),

   '.sidebar': {
      padding: theme.spacing(2),
      width: 300,
      position: 'relative',
   },

   '.content': {
      padding: theme.spacing(2),
      flex: 1,
   },
}));

const ProfilePic = styled('div')(({ theme }) => ({
   width: 120,
   height: 120,
   borderRadius: 120,
   border: '5px solid',
   borderColor: theme.palette.primary.main,
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',

   img: {
      width: '90%',
   },
}));

const LogoutButton = styled(Button)({
   position: 'absolute',
   bottom: 0,
   left: 0,
});

LogoutButton.defaultProps = {
   fullWidth: true,
   variant: 'contained',
   color: 'warning',
   endIcon: <ExitToApp />,
};
