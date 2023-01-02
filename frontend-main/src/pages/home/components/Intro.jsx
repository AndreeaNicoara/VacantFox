import { Container, styled, Typography } from '@mui/material';
import SearchBox from 'components/SearchBox';
import { useNavigate } from 'react-router-dom';
import { getFormEntries } from 'utils';

export default function Intro() {
   const navigate = useNavigate();

   /**
    * @param {React.ChangeEvent<HTMLInputElement>} e
    */
   function handleSubmit(e) {
      e.preventDefault();
      const entries = getFormEntries(e.currentTarget);

      // right now it's not gonna do anything
      // TODO: read these query in /find-jobs and init a search
      navigate({
         pathname: '/find-jobs',
         search: `?title=${entries.title}&location=${entries.location}`,
      });
   }

   return (
      <Root>
         <Container maxWidth='xl' className='container'>
            <Content>
               <Typography variant='h1' fontSize={64} fontWeight='700'>
                  Find Your Favorite Job with Passion
               </Typography>

               <Typography variant='h6' fontWeight={400}>
                  Millions of jobs. Search by what matters to you and find the
                  one fateful job.
               </Typography>

               <form onSubmit={handleSubmit}>
                  <SearchBox size='small' />
               </form>
            </Content>

            <Abstract>
               <img
                  src='/assets/intro-guy.png'
                  alt='' // intentional
                  loading='eager'
               />
            </Abstract>
         </Container>
      </Root>
   );
}

const Root = styled('div')(({ theme }) => ({
   height: 800,
   backgroundImage: `linear-gradient(113.08deg, ${theme.palette.primary.main} -16.43%, #A675FF 116.77%)`,
   color: 'white',

   '.container': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
   },
}));

const Content = styled('div')(({ theme }) => ({
   maxWidth: 620,
   display: 'flex',
   flexDirection: 'column',
   gap: theme.spacing(4),
}));

const Abstract = styled('div')(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',

   img: {
      maxWidth: '601.5px',
      height: 'auto',
      objectFit: 'cover',
   },
}));
