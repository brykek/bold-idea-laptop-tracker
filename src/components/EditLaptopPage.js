import React from 'react';
import LaptopForm from './LaptopForm';
import { Typography } from '@mui/material';


function EditLaptopPage(props) {
    function updateLaptop(laptopData) {
        const today = new Date().toISOString().slice(0, 10);
        laptopData.last_updated = today;
        console.log('Updating laptop...');
        console.log('Laptop Data:', laptopData)
        // Invoke the update api function
    }

    function discardChanges() {
        console.log('Discard changes.')
        // Route back to View Inventory page
    }

    return (
        <div className='page-container'>
            <Typography variant='h4' align='center' sx={{ color: 'primary.main', fontWeight: 'bold' }} gutterBottom >Edit Laptop</Typography>
            <LaptopForm
                laptopData={props.laptopData}
                save={updateLaptop}
                saveMessage='Save Changes'
                cancel={discardChanges}
                cancelMessage='Discard Changes'
            />
        </div>
    );
}

export default EditLaptopPage;
