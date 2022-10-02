import React from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
} from '@mui/material';


function Login() {

  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    // sign in function here
  }

  return (<>
    <Container sx={{ display: 'flex', alignContent: 'center', justifyContent: 'center', maxWidth: '1220px', margin: '24px auto 0;' }} >
      <Paper sx={{ mt: 4, p: 3, display: 'flex', flexDirection: 'column', gap: 2, minWidth: '300px' }} >
        <Typography variant='h5' color='primary' >Welcome Back</Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label='Email'
            required
            fullWidth
            id='email'
            name='email'
            autocomplete='email'
            autofocus
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
          />

          <Button
            fullWidth
            variant='contained'
            type='submit'
            color='primary'
            sx={{ mt: 2 }}
          >Sign In</Button>

          <Typography color='secondary' component='a' href='/reset-password' >Forgot your password?</Typography>
        </Box>
      </Paper>
    </Container>
  </>);
}

export default Login;
