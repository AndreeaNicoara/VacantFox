import { Stack, TextField, Typography } from '@mui/material';

export default function PreviousJob({ fields }) {
   return (
      <>
         <Typography fontSize={32} fontWeight='600' my={3}>
            Enter a past job that shows relevant experience
         </Typography>

         <Typography mb={2} mt={-1}>
            This step is Optional
         </Typography>

         <Stack gap={2}>
            <TextField
               label='Job Title'
               name='prev_job_title'
               defaultValue={fields.prev_job.title}
            />
            <TextField
               label='Location'
               name='prev_job_location'
               defaultValue={fields.prev_job.location}
            />
         </Stack>
      </>
   );
}
