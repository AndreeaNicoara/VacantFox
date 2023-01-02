import { Button, CircularProgress, ButtonProps } from '@mui/material';

/**
 * @param {{loading: boolean} & ButtonProps} props
 */
export default function LoadingButton(props) {
   const { loading, children, ...rest } = props;

   return (
      <Button
         type='submit'
         variant='contained'
         fullWidth
         disabled={loading}
         endIcon={loading && <CircularProgress size={20} disableShrink />}
         {...rest}
      >
         {children}
      </Button>
   );
}
