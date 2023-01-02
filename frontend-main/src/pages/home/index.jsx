import { Container } from '@mui/material';
import Loading from 'components/Loading';
import { Suspense } from 'react';
import Categories from './components/Categories';
import Intro from './components/Intro';
import LatestJobs from './components/LatestJobs';

export default function Home() {
   return (
      <>
         <Intro />

         {/* Instantly show the Intro and don't wait for other parts  */}
         <Suspense fallback={<Loading full />}>
            <Container>
               <Categories />
               <LatestJobs />
            </Container>
         </Suspense>
      </>
   );
}
