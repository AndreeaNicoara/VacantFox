import { IconButton, Link, styled } from '@mui/material';

export const Root = styled('footer')({
   backgroundColor: '#231B35',
});

export const Content = styled('div')(({ theme }) => ({
   paddingTop: theme.spacing(3),
   paddingBottom: theme.spacing(3),
   display: 'flex',
   gap: theme.spacing(12),
   color: '#D6DDEB',

   '.brand': {
      display: 'flex',
      flexDirection: 'column',
      gap: theme.spacing(2),
   },

   '.group': {
      display: 'flex',
      flexDirection: 'column',
      gap: theme.spacing(2),
   },

   '.group-title': {
      fontSize: 18,
      fontWeight: 600,
      color: 'white',
   },

   '.input-container': {
      display: 'flex',
      alignItems: 'center',
      // TODO: should increase the wrapper Container size globally instead of fix width
      width: 330,
      height: 50,
      borderRadius: 50, // ! same for this
      marginTop: theme.spacing(4),
   },

   '& .MuiTextField-root': {
      backgroundColor: theme.palette.background.paper,
      width: 'inherit',
      height: 'inherit',
      borderRadius: 'inherit',
   },

   '& .MuiButton-root': {
      marginLeft: -90,
      borderRadius: 'inherit',
   },
}));

export const LinkStyle = styled(Link)(({ theme }) => ({
   color: '#D6DDEB',
   whiteSpace: 'nowrap',
}));

export const Copyright = styled('div')(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'space-between',
   paddingTop: theme.spacing(2),
   paddingBottom: theme.spacing(2),
}));

export const Icon = styled(IconButton)({
   backgroundColor: '#393249',
   color: 'white',
});
