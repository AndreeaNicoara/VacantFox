import {
   Container,
   MenuItem,
   Stack,
   styled,
   TextField,
   Typography,
} from '@mui/material';
import SearchBox from 'components/SearchBox';

const filters = {
   employmentType: ['On-site', 'Remote', 'Hybrid'],
   categories: [
      'Design',
      'Sales',
      'Marketing',
      'Finance',
      'Technology',
      'Engineering',
      'Business',
      'Human Resource',
   ],
   jobLevel: ['Junior', 'Senior', 'Manager'],
   salaryRange: [
      '$5000-$10000',
      '$10000-$15000',
      '$15000-$20000',
      '$20000-$25000',
   ],
};

export default function Header({ initialFilters }) {
   return (
      <Root>
         <Container maxWidth='xl' className='container'>
            <Stack gap={4}>
               <Typography variant='h1' fontWeight='700' textAlign='center'>
                  Find Your Dream Job
               </Typography>

               <Typography
                  variant='h5'
                  color='textSecondary'
                  textAlign='center'
               >
                  Find your next career at companies like HubSpot, Nike, and
                  Dropbox
               </Typography>

               <SearchBox />

               <Stack direction='row' gap={2}>
                  <RenderMenu
                     label='Type of Employment'
                     name='employmentType'
                     items={filters.employmentType}
                  />
                  <RenderMenu
                     label='Categories'
                     name='categories'
                     items={filters.categories}
                     defaultValue={initialFilters['category']}
                  />
                  <RenderMenu
                     label='Job Level'
                     name='jobLevel'
                     items={filters.jobLevel}
                  />
                  <RenderMenu
                     label='Salary Range'
                     name='salary'
                     items={filters.salaryRange}
                  />
               </Stack>
            </Stack>
         </Container>
      </Root>
   );
}

/**
 * @param {{
 * label: string,
 * name: string,
 * items: string[]
 * }} props
 */
function RenderMenu(props) {
   return (
      <TextField
         select
         label={props.label}
         name={props.name}
         defaultValue={props.defaultValue}
         fullWidth
      >
         {props.items.map(item => (
            <MenuItem key={item} value={item}>
               {item}
            </MenuItem>
         ))}
      </TextField>
   );
}

const Root = styled('div')(({ theme }) => ({
   height: 600,

   '.container': {
      height: 'inherit',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
   },
}));
