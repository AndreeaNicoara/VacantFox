import R from 'react';
import {
   Outlet,
   useNavigate,
   useParams,
   useSearchParams,
} from 'react-router-dom';
import useSWR, { preload } from 'swr';
import JobCard from 'components/JobCard';
import { Stack, styled, Typography } from '@mui/material';
import Loading from 'components/Loading';
import fetcher, { axios } from 'api/fetcher';
import { getSearchQueries } from 'utils';

export default function Jobs({ filters }) {
   const navigate = useNavigate();
   const params = useParams();
   const [searchParams] = useSearchParams();

   // ! checking if there is any search params
   // e.g. ?category=Sales
   const hasQuery = !!Object.keys(getSearchQueries(searchParams)).length;
   const hasFilters = filters && !!Object.values(filters).length;

   // ! start searching before useEffect
   const { data: filteredJobs } = useSWR(hasFilters && '/search', url =>
      fetcher(url, { params: filters })
   );

   // ! don't fetch all jobs when there is any search query
   const { data: latestJobs } = useSWR((!hasQuery || params?.slug) && '/jobs', {
      fallbackData: filteredJobs,
   });

   const [jobs, setJobs] = R.useState(() => filteredJobs || latestJobs);
   const [loading, setLoading] = R.useState(false);

   // Always Keep the first job open
   // but not when there is search filters
   const openFirstJob = R.useCallback(() => {
      if (!jobs?.length) return null;

      navigate(`/find-jobs/${jobs[0].slug}`, { replace: true });
   }, [navigate, jobs]);

   R.useEffect(() => {
      if (hasQuery) return;

      // already a job open
      if (params?.slug) return;

      openFirstJob();
   }, [openFirstJob, searchParams, jobs]); // jobs = when jobs results changes

   R.useEffect(() => {
      if (!jobs?.length) return;

      for (const job of jobs) {
         preload(`/job/${job.slug}`, fetcher);
      }
   }, [jobs]);

   R.useEffect(() => {
      if (!hasFilters) return;

      setLoading(true);

      axios
         .get('/search', { params: filters })
         .then(res => {
            setJobs(res.data.data);
            setLoading(false);
         })
         .catch(e => {
            setLoading(false);
            throw new Error(e);
         });
   }, [filters]);

   if (loading)
      return (
         <Root>
            <Loading />
         </Root>
      );

   if (!jobs?.length)
      return (
         <Root>
            <Typography variant='h2' textAlign='center'>
               No jobs found
            </Typography>
         </Root>
      );

   return (
      <Root>
         <Stack gap={2}>
            {jobs?.map(job => (
               <JobCard key={job.slug} {...job} />
            ))}
         </Stack>

         {/* Required, even if Outlet elements(route) have their own Suspense boundary */}
         <R.Suspense fallback={<Loading />}>
            <Outlet />
         </R.Suspense>
      </Root>
   );
}

const Root = styled('div')(({ theme }) => ({
   paddingTop: theme.spacing(6),
   paddingBottom: theme.spacing(6),
   display: 'flex',
   gap: theme.spacing(3),
}));
