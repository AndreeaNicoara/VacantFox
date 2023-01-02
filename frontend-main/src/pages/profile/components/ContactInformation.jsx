import { Card, Divider, Stack } from '@mui/material';
import ProfileSectionItem from 'components/ProfileSectionItem';
import ProfileSectionHeader from '../../../components/ProfileSectionHeader';

export default function ContactInformation(props) {
   return (
      <Stack>
         <ProfileSectionHeader>Contact Information</ProfileSectionHeader>

         <Card variant='outlined'>
            <ProfileSectionItem title='Full Name'>
               {props.name}
            </ProfileSectionItem>

            <Divider />

            <ProfileSectionItem title='Email Address'>
               {props.email}
            </ProfileSectionItem>
         </Card>
      </Stack>
   );
}
