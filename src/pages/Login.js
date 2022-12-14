import React, { useState } from 'react';
import Axios from 'axios';

import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
} from '@mui/material';


function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [loginStatus, setLoginStatus] = useState('');

  const login = () => {
      Axios.post('http://localhost:3000/login', {
          username:username,
          password:password
      }).then((response) => {
        if (response.data.message) {
          setLoginStatus(response.data.message)
        } else {
          setLoginStatus(response.data[0].username)
        }
      });
  }

  return (<>
    <Container sx={{ display: 'flex', alignContent: 'center', justifyContent: 'center', maxWidth: '1220px', margin: '24px auto 0;' }} >
      <Paper sx={{ mt: 4, p: 3, display: 'flex', flexDirection: 'column', gap: 2, minWidth: '375px' }} >
        <Typography variant='h5' color='primary' >Log In</Typography>

        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
            onClick={login}

          >Log In</Button>

          <Typography color='primary' component='a' href='/reset-password' >Forgot your password?</Typography>
          <Typography color='primary' component='a' href='/signup' >Don't have an account?</Typography>
          <Typography color='primary' >{loginStatus}</Typography>
        </Box>
      </Paper>
    </Container>
  </>);
}

export default Login;
