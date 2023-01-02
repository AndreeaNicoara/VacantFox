import { Stack, TextField, Typography } from '@mui/material';
import { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';

let QAs = {};

export default function Questions({ fields, submit }) {
   const params = useParams();
   const { data: job } = useSWR(`/job/${params.slug}`);
   const questions = job.questions;

   console.log('fields', fields);

   /**
    * @param {string} title
    */
   function handleChange(title) {
      return e => {
         QAs = {
            ...QAs,
            [title]: e.target.value,
         };

         submit({
            questions: QAs,
         });
      };
   }

   return (
      <>
         <Typography fontSize={32} fontWeight='600' my={3}>
            Questions from the Employer
         </Typography>

         <Stack gap={2}>
            {questions?.map(item => (
               <Fragment key={item}>
                  <Typography fontSize={20} fontWeight={500}>
                     {item}
                  </Typography>

                  <TextField
                     multiline
                     rows={2}
                     label='Your answer'
                     onChange={handleChange(item)}
                     defaultValue={fields['questions']}
                     required
                  />
               </Fragment>
            ))}
         </Stack>
      </>
   );
}
