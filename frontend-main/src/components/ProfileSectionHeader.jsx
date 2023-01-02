import { Button, Stack, Typography } from '@mui/material';

/**
 * @param {{
 * children: string
 * }} props
 */
export default function ProfileSectionHeader(props) {
   return (
      <Stack direction='row' justifyContent='space-between'>
         <Typography fontSize={20} fontWeight='500'>
            {props.children}
         </Typography>

         <Button>Edit</Button>
      </Stack>
   );
}
