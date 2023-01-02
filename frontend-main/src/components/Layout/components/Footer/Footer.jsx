import {
   FacebookRounded,
   Instagram,
   LinkedIn,
   SportsBasketball,
   Twitter,
} from '@mui/icons-material';
import {
   Button,
   Container,
   Divider,
   Stack,
   TextField,
   Typography,
} from '@mui/material';
import Logo from 'components/Logo';
import { Copyright, Content, LinkStyle, Root, Icon } from './styles';

export default function Footer() {
   return (
      <Root>
         <Container>
            <Content>
               <span className='brand'>
                  <Logo src='/logo-full-light.svg' />

                  <Typography>
                     Great platform for the job seeker that passionate about
                     startups. Find your dream job easier.
                  </Typography>
               </span>

               <span className='group'>
                  <Typography className='group-title'>About</Typography>

                  <LinkStyle>Companies</LinkStyle>
                  <LinkStyle>Pricing</LinkStyle>
                  <LinkStyle>Terms</LinkStyle>
                  <LinkStyle>Advice</LinkStyle>
                  <LinkStyle>Privacy Policy</LinkStyle>
               </span>

               <span className='group'>
                  <Typography className='group-title'>Resources</Typography>

                  <LinkStyle>Help Docs</LinkStyle>
                  <LinkStyle>Guide</LinkStyle>
                  <LinkStyle>Updates</LinkStyle>
                  <LinkStyle>Contact Us</LinkStyle>
               </span>

               <span className='group'>
                  <Typography className='group-title'>
                     Get Job Notifications
                  </Typography>

                  <Typography variant='subtitle2'>
                     The latest job news, articles, sent to your inbox weekly.
                  </Typography>

                  <div className='input-container'>
                     <TextField
                        fullWidth
                        placeholder='Enter your email address'
                        required
                     />
                     <Button variant='contained'>Submit</Button>
                  </div>
               </span>
            </Content>

            <Divider sx={{ borderColor: '#393249', my: 1 }} />

            <Copyright>
               <Typography variant='subtitle2' color='#918D9A'>
                  VacantFox 2022. All rights reserved.
               </Typography>

               {/* TODO: using MUI icons, might need to change to design icons later */}
               <Stack direction='row' spacing={3}>
                  <Icon>
                     <FacebookRounded />
                  </Icon>
                  <Icon>
                     <Instagram />
                  </Icon>
                  <Icon>
                     {/* The official dribble icon :) */}
                     <SportsBasketball />
                  </Icon>
                  <Icon>
                     <LinkedIn />
                  </Icon>
                  <Icon>
                     <Twitter />
                  </Icon>
               </Stack>
            </Copyright>
         </Container>
      </Root>
   );
}
