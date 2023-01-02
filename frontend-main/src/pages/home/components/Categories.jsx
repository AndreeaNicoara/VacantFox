import {
   AccountBalance,
   ArrowForward,
   Badge,
   Business,
   Code,
   DesignServices,
   Engineering,
   ManageHistory,
   MarkEmailReadOutlined,
} from '@mui/icons-material';
import {
   Card,
   CardActionArea,
   CardContent,
   Stack,
   styled,
   Typography,
} from '@mui/material';
import useSWR from 'swr';
import PageSegment from './PageSegment';
import { Suspense } from 'react';
import { Link } from 'react-router-dom';
import Loading from 'components/Loading';

const IconMap = {
   Design: DesignServices,
   Sales: ManageHistory,
   Marketing: MarkEmailReadOutlined,
   Finance: AccountBalance,
   Technology: Code,
   Engineering: Engineering,
   Business: Business,
   'Human Resource': Badge,
};

export default function Categories() {
   const { data: categories } = useSWR('/categories');

   return (
      <PageSegment title='Explore by Category' action='Show All Jobs'>
         <Content>
            <Suspense fallback={<Loading />}>
               {categories.map(item => (
                  <Category key={item.category} {...item} />
               ))}
            </Suspense>
         </Content>
      </PageSegment>
   );
}

function Category(props) {
   const Icon = IconMap[props.category];

   return (
      <Card variant='outlined'>
         <CardActionArea
            component={Link}
            to={`/find-jobs?category=${props.category}`}
         >
            <CardContent>
               <Stack gap={2}>
                  {<Icon color='primary' />}

                  <Typography variant='h5'>{props.category}</Typography>

                  <Stack direction='row' alignItems='center'>
                     <Typography
                        variant='subtitle1'
                        color='textSecondary'
                        mr={1}
                     >
                        {props.available} jobs available
                     </Typography>

                     <ArrowForward fontSize='inherit' />
                  </Stack>
               </Stack>
            </CardContent>
         </CardActionArea>
      </Card>
   );
}

const Content = styled('div')(({ theme }) => ({
   display: 'grid',
   gridTemplateColumns: 'repeat(4, 1fr)',
   gap: theme.spacing(2),
}));
