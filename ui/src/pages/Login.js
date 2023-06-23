import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Modal
} from '@mui/material';

import { loggedIn } from '../util/helpers';
import Errors from '../enums/errors';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;


function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  // Redirect to Inventory page if already logged in
  useEffect(() => {
    if (loggedIn()) { 
      navigate('/inventory');
    }
  });
  
	const login = () => {
    if (!username.length > 0 || !password.length > 0) {
      setErrorMessage(Errors.EMPTY_FIELD);
      return;
    }

		axios.post(`${API_BASE_URL}/login`, {
			username: username,
			password: password
		}).then((response) => {
      var decoded = jwtDecode(response.data.token);
      var expiry = new Date(decoded.exp * 1000);

      Cookies.set('token', response.data.token, { expires: expiry });
      
      navigate('/inventory');
			window.location.reload(false);
		}).catch((err) => {
      console.error(err);
      if (err.response.status === 401) {
			  setErrorMessage('Incorrect username or password.');
      } else { 
        setErrorMessage(err.message);
      }
		});
	}

  return <>
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
              sx={{ my: 2 }}
              onClick={login}
            >
              Log In
            </Button>

            <Typography align='center' color='primary' sx={{ cursor: 'pointer' }} component='a' onClick={() => setShowForgotPasswordModal(true)}>Forgot your password?</Typography>
            <Typography align='center' color='primary' sx={{ cursor: 'pointer' }} component='a' onClick={() => setShowSignUpModal(true)}>Don't have an account?</Typography>
            <Typography align='center' color='red'>{errorMessage}</Typography>
          </Box>
        </Paper>
      </Container>
    
      {/* Forgot Password Modal */}
      <Modal open={showForgotPasswordModal} onClose={() => setShowForgotPasswordModal(false)} >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 600, bgcolor: 'background.paper', borderRadius: '16px', boxShadow: 24, p: 4, alignContent: 'center' }} >
            <Typography align='center' variant='h5' component='h2' sx={{ color: 'primary.dark', fontWeight: 'bold', mb: 3 }} >
                Forgot your password?
            </Typography>
            <Typography align='center' component='h2' sx={{ color: 'primary.dark' }} >
                Contact an administrator for help resetting your password.
            </Typography>
        </Box>
      </Modal>

      {/* Sign Up Modal  */}
      <Modal open={showSignUpModal} onClose={() => setShowSignUpModal(false)} >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 600, bgcolor: 'background.paper', borderRadius: '16px', boxShadow: 24, p: 4, alignContent: 'center' }} >
            <Typography align='center' variant='h5' component='h2' sx={{ color: 'primary.dark', fontWeight: 'bold', mb: 3 }} >
                Don't have an account?
            </Typography>
            <Typography align='center' component='h2' sx={{ color: 'primary.dark' }} >
                Contact an administrator to register for an account.
            </Typography>
        </Box>
      </Modal>
  </>
}

export default Login;
