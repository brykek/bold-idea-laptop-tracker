import React, { useState } from 'react';

// MATERIAL-UI COMPONENTS
import {
    Typography,
    TextField,
    Button,
    Box,
} from '@mui/material';


export default function Login(props) {
    const [formData, setFormData] = useState(props.laptopData || {
        username: '',
        password: ''
    });

    function handleInputChange(value, field) {
        const updatedData = { ...formData };
        updatedData[field] = value;
        setFormData(updatedData);
    }

  return(
    <div className='page-container'>
    <Box sx={{ display: 'grid', gap: 2, width: 300,  gridTemplateColumns: 'repeat(1, 1fr)' }} >
    <Typography variant='h4' align='center' sx={{ color: 'primary.main', fontWeight: 'bold' }} gutterBottom >Login</Typography>
    <TextField
    id='username'
    value={formData.username}
    label='Username'
    size='small'
    onChange={(event) => handleInputChange(event.target.value, 'username')}
    />
    <TextField
    id='password'
    value={formData.password}
    label='Password'
    size='small'
    onChange={(event) => handleInputChange(event.target.value, 'password')}
    />
        <Button
        variant='contained'
        color='secondary'
        onClick={() => props.save(formData)}
    >Submit</Button>
            </Box>
    </div>
  )
}
