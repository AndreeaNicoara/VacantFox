import {
   List,
   ListItem,
   ListItemButton,
   ListItemText,
   styled,
} from '@mui/material';
import { NavLink } from 'react-router-dom';

export default function Navigation() {
   return (
      <ListStyle>
         <ListItemStyle>
            <ListItemButton component={NavLink} to='/find-jobs'>
               <ListItemText>Find Jobs</ListItemText>
            </ListItemButton>
         </ListItemStyle>

         <ListItemStyle>
            <ListItemButton component={NavLink} to='/browse'>
               <ListItemText>Browse Companies</ListItemText>
            </ListItemButton>
         </ListItemStyle>
      </ListStyle>
   );
}

const ListStyle = styled(List)({
   display: 'inline-flex',
   marginRight: 'auto',
   padding: 0,
   minHeight: 'inherit',
});

const ListItemStyle = styled(ListItem)({
   minHeight: 'inherit',
   padding: 0,
   whiteSpace: 'nowrap',

   '.MuiListItemButton-root': {
      minHeight: 'inherit',
   },

   '.Mui-selected, .active': {
      // TODO; These colors should come from theme (e.g. theme.palette.primary)
      borderBottom: '4px blue inset',
      color: 'blue',
   },
});
