import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    Container,
    Typography,
} from '@mui/material';

import LaptopForm from '../components/LaptopForm';
import { bearerTokenConfig } from '../util/helpers';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;


function AddLaptopPage(props) {
    const navigate = useNavigate()
    function createLaptop(laptopData, cb) {
        axios.post(
            `${API_BASE_URL}/add`, 
            laptopData, 
            bearerTokenConfig
        ).then(() => {
            alert('Laptop Added Successfully!');
            cb();
        }).catch((err) => {
            console.error(err);
            alert('Something went wrong.');
        });
    }

    function discardEntry() {
        navigate('/inventory');
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
