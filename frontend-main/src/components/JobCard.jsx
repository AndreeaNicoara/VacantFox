import { FiberManualRecord } from '@mui/icons-material';
import {
   Avatar,
   Card,
   CardActionArea,
   CardContent,
   Chip,
   Stack,
   Typography,
} from '@mui/material';
import { NavLink } from 'react-router-dom';

/**
 *
 * @param {{
 *  jobTitle: string,
 *  company: string,
 *  location: string,
 *  jobType: string,
 *  categories: string[]
 *}} props
 */
export default function JobCard(props) {
   return (
      <Card
         variant='outlined'
         sx={{
            '.active': {
               bgcolor: 'blue',
               color: 'white',
               '.MuiTypography-root': { color: 'white' },
               span: { color: 'white' },
            },
         }}
      >
         <CardActionArea component={NavLink} to={props.slug}>
            <CardContent>
               <Stack direction='row' gap={2}>
                  <Avatar src={props.avatar} sx={{ width: 64, height: 64 }}>
                     {props.company.charAt(0)}
                  </Avatar>

                  <Stack gap={1.5}>
                     <Typography variant='h5' fontWeight='500'>
                        {props.jobTitle}
                     </Typography>

                     <Typography
                        variant='subtitle'
                        color='textSecondary'
                        display='flex'
                        alignItems='center'
                        gap={1.5}
                     >
                        {props.company}{' '}
                        <FiberManualRecord sx={{ fontSize: '8px' }} />{' '}
                        {props.location}
                     </Typography>

                     <Stack direction='row' alignItems='center' gap={1.5}>
                        <Chip variant='filled' label={props.jobType} />

                        {`|`}

                        {/* {props.categories?.map(category => ( */}
                        <Chip
                           variant='outlined'
                           color='primary'
                           label={props.category}
                        />
                        {/* ))} */}
                     </Stack>
                  </Stack>
               </Stack>
            </CardContent>
         </CardActionArea>
      </Card>
   );
}
