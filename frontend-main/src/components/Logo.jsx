import { styled } from '@mui/material';
import { SxProps } from '@mui/material';
import { Link } from 'react-router-dom';

//! TypeScript equivalent of the JSDoc below (in use)
/*
interface Props {
   sx?: SxProps;
}

export default function Logo(props: Props) {
*/

//! JSDoc comment
/**
 * @param {{
 * sx?: SxProps
 * }} props
 */

export default function Logo(props) {
   return (
      <Root to='/'>
         <img src='/logo-full.svg' alt='VacantFox logo' {...props} />
      </Root>
   );
}

const Root = styled(Link)(({ theme }) => ({
   textDecoration: 'none',
   display: 'flex',
   alignItems: 'center',
   gap: theme.spacing(1.1),

   img: {
      height: 40,
   },
}));
