import React, { useState } from 'react';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
} from '@mui/material';


function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
 
	const login = () => {
    if (!username.length > 0 || !password.length > 0) {
      setErrorMessage("Please enter valid credentials before submitting.");
      return;
    }
		axios.post('http://localhost:3001/login', {
			username: username,
			password: password
		}).then((response) => {
      var decoded = jwtDecode(response.data.token);
      var expiry = new Date(decoded.exp * 1000);

      Cookies.set('token', response.data.token, { expires: expiry });
			sessionStorage.setItem('user', response.data.username);
			
      navigate('/inventory');
			window.location.reload(false);
		}).catch((err) => {
      console.log(err);
      if (err.response.status === 401) {
			  setErrorMessage('Incorrect username or password.');
      } else { 
        setErrorMessage(err.message);
      }
		});
	}

  return (
    <>
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
              color='secondary'
              sx={{ mt: 2 }}
              onClick={login}
            >
              Log In
            </Button>

            <Typography color='primary' component='a' href='/reset-password' >Forgot your password?</Typography>
            <Typography color='primary' component='a' href='/signup' >Don't have an account?</Typography>
            <Typography color='red'>{errorMessage}</Typography>
          </Box>
        </Paper>
      </Container>
    </>
  );
}

export default Login;
