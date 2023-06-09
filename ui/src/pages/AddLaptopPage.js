import React from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {
    Container,
    Typography,
} from '@mui/material';

import LaptopForm from '../components/LaptopForm';
import { bearerTokenConfig } from '../util/helpers';

function AddLaptopPage(props) {
    const navigate = useNavigate()
    function createLaptop(laptopData, cb) {
        axios.post(
            'http://localhost:3001/add', 
            laptopData, 
            bearerTokenConfig
        ).then(() => {
            alert('Laptop Added Successfully!');
            cb();
        }).catch((err) => {
            console.err(err);
            alert("Something went wrong.");
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
