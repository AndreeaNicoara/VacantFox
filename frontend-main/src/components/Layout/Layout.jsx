import {
   AppBar,
   Avatar,
   Button,
   Container,
   IconButton,
   Toolbar,
} from '@mui/material';
import Loading from 'components/Loading';
import Logo from 'components/Logo';
import { Suspense } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from 'store/auth/provider';
import Footer from './components/Footer';
import Navigation from './components/Navigation';

const Layout = props => {
   const { user } = useAuth();

   return (
      <>
         <AppBar elevation={0} position='sticky' color='inherit'>
            <Toolbar disableGutters>
               <Container
                  sx={{
                     minHeight: 'inherit',
                     display: 'flex',
                     alignItems: 'center',
                     gap: 4,
                  }}
               >
                  <Logo />

                  <Navigation />

                  <Button component={Link} to='/create-job'>
                     Create Job
                  </Button>

                  <Button component={Link} to='/submit-cv'>
                     Edit CV
                  </Button>

                  {!user && (
                     <Button variant='contained' component={Link} to='/signin'>
                        Sign In
                     </Button>
                  )}

                  {user && (
                     <IconButton component={Link} to='/profile'>
                        <Avatar>{user.first_name.charAt(0)}</Avatar>
                     </IconButton>
                  )}
               </Container>
            </Toolbar>
         </AppBar>

         <main>
            <Suspense fallback={<Loading full />}>
               <Outlet />
            </Suspense>
         </main>

         <Footer />
      </>
   );
};

export default Layout;
