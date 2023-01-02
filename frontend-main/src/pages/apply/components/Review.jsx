import { Card, Stack, Typography } from '@mui/material';
import ProfileSectionHeader from 'components/ProfileSectionHeader';
import ProfileSectionItem from 'components/ProfileSectionItem';
import ContactInformation from 'pages/profile/components/ContactInformation';
import Resume from 'pages/profile/components/Resume';

/**
 * @param {{fields: {
 * first_name: string,
 * last_name: string,
 * email: string,
 * phone: string,
 * city: string,
 * resume: File,
 * questions: {[key: string]: string},
 * prev_job: {
 *  job_title?: string,
 *  location?: string,
 * }
 * }}} param0
 */
export default function Review({ fields }) {
   return (
      <>
         <Typography fontSize={32} fontWeight='600' my={3}>
            Please review your application
         </Typography>

         <Stack gap={2}>
            <ContactInformation
               name={fields.first_name + ' ' + fields.last_name}
               email={fields.email}
            />

            <Resume file={fields.resume} />

            {fields.questions && (
               <Stack>
                  <ProfileSectionHeader>
                     Employee Questions
                  </ProfileSectionHeader>

                  {fields.questions &&
                     Object.entries(fields.questions).map(([q, a]) => {
                        return (
                           <Card key={q} variant='outlined'>
                              <ProfileSectionItem title={q}>
                                 {a}
                              </ProfileSectionItem>
                           </Card>
                        );
                     })}
               </Stack>
            )}

            {fields.prev_job?.title && (
               <Stack>
                  <ProfileSectionHeader>Previous Job</ProfileSectionHeader>

                  <Card variant='outlined'>
                     <ProfileSectionItem title={fields.prev_job.location}>
                        {fields.prev_job.title}
                     </ProfileSectionItem>
                  </Card>
               </Stack>
            )}
         </Stack>
      </>
   );
}
