import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
} from '@mui/material';
import axios from 'axios';

function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const register = () => {
        axios.post('http://localhost:3001/signup', {
            username:username,
            password:password
        }).then((response) => {
            console.log(response)
        });
    }
      

  return (
  <>
    <Container sx={{ display: 'flex', alignContent: 'center', justifyContent: 'center', maxWidth: '1220px', margin: '24px auto 0;' }} >
      <Paper sx={{ mt: 4, p: 3, display: 'flex', flexDirection: 'column', gap: 2, minWidth: '375px' }} >
        <Typography variant='h5' color='primary' >Sign Up</Typography>

        <Box component="form"  sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label='Email'
            required
            fullWidth
            id='email'
            name='email'
            autocomplete='email'
            autofocus
            onChange={(e) => setUsername(e.target.value)}
          />

          <TextField
            label='Password'
            required
            fullWidth
            id='password'
            name='password'
            type='password'
            autocomplete='current-password'
            autofocus
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            fullWidth
            variant='contained'
            type='submit'
            color='secondary'
            sx={{ mt: 2 }}
            onClick={register}
          >Sign Up</Button>
        </Box>
      </Paper>
    </Container>
  </>);
}

export default Signup;
