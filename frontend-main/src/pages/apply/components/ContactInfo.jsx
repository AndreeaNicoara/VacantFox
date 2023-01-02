import { Stack, TextField, Typography } from '@mui/material';

export default function ContactInfo(props) {
   const user = props.fields;

   return (
      <>
         <Typography fontSize={32} fontWeight='600' my={3}>
            Add Your Contact Information
         </Typography>

         <Stack gap={2}>
            <Stack direction='row' gap={2}>
               <TextField
                  label='First Name'
                  name='first_name'
                  required
                  defaultValue={user.first_name}
               />
               <TextField
                  label='Last Name'
                  name='last_name'
                  required
                  defaultValue={user.last_name}
               />
            </Stack>

            <TextField
               label='Email Address'
               name='email'
               required
               defaultValue={user.email}
            />
            <TextField
               label='City, State'
               name='city'
               required
               defaultValue={user.city}
            />
            <TextField
               label='Phone No.'
               name='phone'
               type='tel'
               required
               defaultValue={user.phone}
            />
         </Stack>
      </>
   );
}
