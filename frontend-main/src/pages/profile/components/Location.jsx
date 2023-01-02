import { Card, Stack } from '@mui/material';
import ProfileSectionItem from 'components/ProfileSectionItem';
import ProfileSectionHeader from 'components/ProfileSectionHeader';

export default function Location(props) {
   return (
      <Stack>
         <ProfileSectionHeader>Location</ProfileSectionHeader>

         <Card variant='outlined'>
            <ProfileSectionItem title='City, State'>
               {props.location || 'N/A'}
            </ProfileSectionItem>
         </Card>
      </Stack>
   );
}
