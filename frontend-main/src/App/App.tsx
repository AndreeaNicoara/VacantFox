import { Route, Routes } from 'react-router-dom';
import Layout from 'components/Layout';
import AuthLayout from 'components/Layout/AuthLayout';
import RequireAuth from 'components/RequireAuth';
import Register from 'pages/auth/register';
import SignIn from 'pages/auth/singin';
import Home from 'pages/home';
import FindJobs from 'pages/find-jobs';
import JobsDetails from 'pages/jobs-details';
import Section from 'components/Section';
import Apply from 'pages/apply';
import Profile from 'pages/profile';
import JobAction from 'pages/jobs-details/components/JobAction';
import CreateJob from 'pages/create-job';

function App() {
   return (
      <Routes>
         <Route element={<Layout />}>
            <Route path='/' element={<Home />} />

            <Route path='/find-jobs' element={<FindJobs />}>
               <Route
                  path=':slug'
                  element={
                     <JobsDetails>
                        <JobAction />
                     </JobsDetails>
                  }
               />
            </Route>

            <Route
               path=':slug'
               element={
                  <Section>
                     <JobsDetails>
                        <JobAction />
                     </JobsDetails>
                  </Section>
               }
            />
            <Route path='/browse' element={<h1>Browse Companies</h1>} />

            <Route element={<AuthLayout />}>
               <Route path='signin' element={<SignIn />} />
               <Route path='register' element={<Register />} />
            </Route>

            <Route element={<RequireAuth />}>
               <Route path='/profile' element={<Profile />} />
               <Route path='/settings' element={<Profile />} />
               <Route path='/submit-cv' element={<h1>Edit CV</h1>} />
               <Route path='/create-job' element={<CreateJob />} />
               <Route path='/apply' element={<Apply />}>
                  <Route path=':slug' element={<JobsDetails />} />
               </Route>
            </Route>
         </Route>
      </Routes>
   );
}

export default App;
