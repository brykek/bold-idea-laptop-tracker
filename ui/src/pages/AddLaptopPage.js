import React, { useState } from 'react';
import LaptopForm from '../components/LaptopForm';
import { useNavigate } from "react-router-dom";
import {
    Container,
    Typography,
} from '@mui/material';
import axios from 'axios';

function AddLaptopPage(props) {
    const navigate = useNavigate()
    function createLaptop(laptopData,cb) {
        console.log('Creating new laptop...');
        console.log('Laptop Data:', laptopData)
        
        axios.post('http://localhost:3001/add', laptopData).then(res => {
                alert('Laptop Added Successfully!');
                cb()
        })
        .catch(err => alert("Something went wrong."))
    }

    function discardEntry() {
        console.log('Discard laptop.')
        navigate('/inventory')
        
    }

    return (
        <Container sx={{ maxWidth: '1220px', margin: '24px auto 0;' }} >
            <Typography variant='h4' align='center' sx={{ color: 'primary.main', fontWeight: 'bold' }} gutterBottom >Add Laptop</Typography>
            <LaptopForm
                save={createLaptop}
                saveMessage='Create Laptop'
                cancel={discardEntry}
                cancelMessage='Discard Entry'
            />
        </Container>
    );
}

export default AddLaptopPage;
