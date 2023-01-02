import { Error, UploadFile } from '@mui/icons-material';
import { Box, Card, CardActionArea, Typography } from '@mui/material';
import { axios } from 'api/fetcher';
import Resume from 'pages/profile/components/Resume';
import { useRef, useState } from 'react';
import { useAuth } from 'store/auth/provider';

export default function UploadResume(props) {
   const { submit, setPending, fields } = props;
   const { user } = useAuth();
   const [fileName, setName] = useState('');
   /**
    * @type {React.MutableRefObject<HTMLInputElement>} inputRef
    */
   const inputRef = useRef(null);

   function handleClick(e) {
      inputRef.current.click();
   }

   // TODO: can't see why it's not working right now
   console.log('fileName', fileName);

   function handleUpload(e) {
      const data = e.target.files[0];

      const config = {
         headers: {
            Authorization: `Bearer ${user.token}`,
            'Content-Type': `multipart/form-data; boundary=${Math.random()
               .toString()
               .substr(2)}`,
         },
      };

      setPending(true);

      axios
         .post('/upload', { data }, config)
         .then(res => {
            submit({
               resume: `${process.env.REACT_APP_API}/${res.data}`,
            });

            setPending(false);
         })
         .catch(error => {
            setPending(false);

            throw new Error(error);
         });
   }

   return (
      <>
         <Typography fontSize={32} fontWeight='600' my={3}>
            Upload Your Resume
         </Typography>

         <Card variant='outlined'>
            {!fields.resume && (
               <CardActionArea onClick={handleClick}>
                  <Box
                     width='200'
                     height={200}
                     display='flex'
                     flexDirection='column'
                     alignItems='center'
                     justifyContent='center'
                     sx={{ input: { display: 'hidden' } }}
                  >
                     <UploadFile fontSize='large' />

                     <input
                        onClick={() => {}}
                        onChange={e => {
                           setName(e.target.files[0].name);
                           handleUpload(e);
                        }}
                        ref={inputRef}
                        type='file'
                        accept='application/pdf'
                        name='resume'
                        required
                     />
                  </Box>
               </CardActionArea>
            )}

            {fields.resume && <Resume file={fileName || 'resume.pdf'} />}
         </Card>
      </>
   );
}
