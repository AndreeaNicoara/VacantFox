import { Card, IconButton, Stack } from '@mui/material';
import MuiLink from '@mui/material/Link';
import ProfileSectionItem from 'components/ProfileSectionItem';
import ProfileSectionHeader from 'components/ProfileSectionHeader';
import { DeleteForever, FilePresent } from '@mui/icons-material';
import { Link } from 'react-router-dom';

export default function Resume(props) {
   return (
      <Stack>
         <ProfileSectionHeader>Resume</ProfileSectionHeader>

         <Card variant='outlined'>
            <ProfileSectionItem>
               <Stack direction='row' gap={2}>
                  <FilePresent />
                  <MuiLink
                     noWrap
                     component={Link}
                     to={props.file}
                     target='_blank'
                  >
                     {props.file?.slice(-44)}
                  </MuiLink>

                  <IconButton sx={{ ml: 'auto' }}>
                     <DeleteForever color='warning' />
                  </IconButton>
               </Stack>
            </ProfileSectionItem>
         </Card>
      </Stack>
   );
}
