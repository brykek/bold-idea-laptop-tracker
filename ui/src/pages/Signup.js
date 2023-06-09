import React, { useState, useEffect } from 'react';
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

import { loggedIn } from '../util/helpers';
import Error from '../enums/errors';


function Signup() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (loggedIn()) { 
      navigate('/inventory');
    }
  });

  const register = () => {
    if (!username.length > 0 || !password.length > 0 || !firstName.length > 0 || !lastName.length > 0) {
      setErrorMessage(Error.EMPTY_FIELD);
      return;
    }
    axios.post('http://localhost:3001/signup', {
      username: username,
      password: password, 
      firstName: firstName,
      lastName: lastName
    }).then(() => {
      navigate('/');
    }).catch((err) => {
      if (err.response.status === 409) { 
        setErrorMessage(Error.USER_EXISTS);
      } else { 
        setErrorMessage(err.message);
      }
    });
  }
      
  return (
    <>
      <Container sx={{ display: 'flex', alignContent: 'center', justifyContent: 'center', maxWidth: '1220px', margin: '24px auto 0;' }} >
        <Paper sx={{ mt: 4, p: 3, display: 'flex', flexDirection: 'column', gap: 2, minWidth: '375px' }} >
          <Typography variant='h5' color='primary' >Sign Up</Typography>
          <Box component="form"  sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label='First Name'
              required
              id='firstName'
              name='firstName'
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              label='Last Name'
              required
              id='lastName'
              name='lastName'
              onChange={(e) => setLastName(e.target.value)}
            />
            <TextField
              label='Email'
              required
              fullWidth
              id='username'
              name='username'
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
              onClick={register}
            >
              Sign Up
            </Button>
          </Box>
          <Typography align='center' color='primary' component='a' href='/' >Back to login</Typography>
          <Typography align='center' color='red'>{errorMessage}</Typography>
        </Paper>
      </Container>
    </>
  );
}

export default Signup;
