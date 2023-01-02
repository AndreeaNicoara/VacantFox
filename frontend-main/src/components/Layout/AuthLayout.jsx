import { Typography, styled, Container } from '@mui/material';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

export default function AuthLayout(props) {
   return (
      <RootStyle>
         <Container className='container'>
            <Section>
               <Abstract>
                  <img src='/assets/auth-screen-artwork.svg' alt='' />

                  <Typography variant='h4'>
                     Find your dream job through JobSearch
                  </Typography>
               </Abstract>
            </Section>

            <Section>
               <Suspense fallback={null}>
                  <Outlet />
               </Suspense>
            </Section>
         </Container>
      </RootStyle>
   );
}

const RootStyle = styled('div')(({ theme }) => ({
   backgroundColor: theme.palette.background.paper,

   '.container': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      padding: theme.spacing(2),
      height: `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
   },
}));

const Section = styled('section')(({ theme }) => ({
   maxWidth: 500,
   padding: theme.spacing(2),
   textAlign: 'center',
}));

const Abstract = styled('div')(({ theme }) => ({
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   justifyContent: 'center',
   gap: theme.spacing(4),

   img: {
      maxWidth: '90%',
   },
}));
