import React from 'react';
import LaptopForm from '../components/LaptopForm';
import {
    Container,
    Typography,
} from '@mui/material';


function AddLaptopPage(props) {
    function createLaptop(laptopData) {
        const today = new Date().toISOString().slice(0, 10);
        laptopData.created_date = today;
        console.log('Creating new laptop...');
        console.log('Laptop Data:', laptopData)
        // Invoke the create api function
    }

    function discardEntry() {
        console.log('Discard laptop.')
        // Route back to View Inventory page
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
