import { CardContent, Stack, Typography } from '@mui/material';

/**
 * @param {{
 * title?: string,
 * children: string | any
 * }} props
 */
export default function ProfileSectionItem(props) {
   return (
      <CardContent>
         <Stack>
            {props.title && (
               <Typography
                  variant='subtitle2'
                  color='textSecondary'
                  fontWeight='bold'
               >
                  {props.title}
               </Typography>
            )}

            <Typography fontWeight='bold'>{props.children}</Typography>
         </Stack>
      </CardContent>
   );
}
