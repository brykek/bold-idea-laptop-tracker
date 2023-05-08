import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LaptopForm from '../components/LaptopForm';
import {
    Container,
    Typography,
} from '@mui/material';


const dummyDataLaptop = {
    archived_date: "",
    charger_included: true,
    charger_type: "87W USB-C",
    laptop_condition: "A",
    cpu_type: "2.6GHz i7",
    created_date: "2022-09-30",
    date_donated: "2022-03-08",
    disk_size: "256 GB",
    donated_by: "OrderMyGear",
    laptop_id: "L6Q3",
    last_updated: "2022-10-01",
    list_price: "",
    manufacturer: "Apple",
    memory: "16 GB",
    model: "MacBook Pro",
    notes: "",
    screen_size: "15\"",
    serial: "C02YL6Q3LVCF",
    sold_price: "",
    status: "READY",
    value: "800.00",
  }

function EditLaptopPage(props) {
    const [laptopData, setLaptopData] = useState(null);
    const { serial } = useParams();

    useEffect(() => {
        if (!laptopData) {
            // invoke get api call with serial
            console.log(`Getting laptop with serial number ${serial}...`)
            setLaptopData(dummyDataLaptop);
        }
    }, [laptopData, serial])

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
        <Container sx={{ maxWidth: '1220px', margin: '24px auto 0;' }} >
            <Typography variant='h4' align='center' sx={{ color: 'primary.main', fontWeight: 'bold' }} gutterBottom >Edit Laptop</Typography>
            <LaptopForm
                laptopData={laptopData}
                save={updateLaptop}
                saveMessage='Save Changes'
                cancel={discardChanges}
                cancelMessage='Discard Changes'
            />
        </Container>
    );
}

export default EditLaptopPage;
