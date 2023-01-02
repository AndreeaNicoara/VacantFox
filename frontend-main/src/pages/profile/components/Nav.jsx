import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { NavLink } from 'react-router-dom';

const navItems = [
   { title: 'My Profile', path: '/profile' },
   { title: 'Settings', path: '/settings' },
];

export default function Nav() {
   return (
      <List
         dense
         sx={{
            padding: 0,
            '.active': {
               bgcolor: ({ palette }) => palette.primary.main,
               color: 'white',
            },
            '.MuiTypography-root': { fontSize: 'large' },
         }}
      >
         {navItems.map(item => (
            <ListItem key={item.path}>
               <ListItemButton component={NavLink} to={item.path}>
                  <ListItemText>{item.title}</ListItemText>
               </ListItemButton>
            </ListItem>
         ))}
      </List>
   );
}
