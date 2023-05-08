import React, { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import LaptopForm from '../components/LaptopForm';
import {
    Container,
    Typography,
} from '@mui/material';
import axios from 'axios';


const dummyDataLaptop = {
    archived_date: "",
    charger_included: true,
    charger_type: "87W USB-C",
    condition: "A",
    cpu_type: "2.6GHz i7",
    created_date: "2022-09-30",
    date_donated: "2022-03-08",
    disk_size: "256 GB",
    donatedBy: "OrderMyGear",
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
    const navigate = useNavigate()
    const [loading,setLoading] = useState(true)
    const [laptopData, setLaptopData] = useState(null);
    const {id}  = useParams();
    useEffect(() => {
        if (!laptopData) {
            axios.get(`http://localhost:3001/inventory/${id}`).then((res)=>{
                console.log('setting to',res.data)
                setLaptopData(res.data);
                setLoading(false)
            }).catch(err=>{
                navigate('/inventory')
            })
            
        }
    }, [id])

    function updateLaptop(laptopData) {
        console.log('Updating laptop...');
        console.log('Laptop Data:', laptopData)
        axios.put(`http://localhost:3001/edit/${id}`,laptopData).then((res)=>{
            alert('Laptop Updated Successfully!')
            navigate('/inventory')
        }).catch(err=>{ alert("Something went wrong.")})
    }

    function discardChanges() {
        console.log('Discard changes.')
        navigate('/inventory')
    }

    return (
        !loading && <Container sx={{ maxWidth: '1220px', margin: '24px auto 0;' }} >
            <Typography variant='h4' align='center' sx={{ color: 'primary.main', fontWeight: 'bold' }} gutterBottom >Edit Laptop</Typography>
            <LaptopForm
                laptopData={laptopData}
                save={updateLaptop}
                isEdit={true}
                saveMessage='Save Changes'
                cancel={discardChanges}
                cancelMessage='Discard Changes'
            />
        </Container>
    );
}

export default EditLaptopPage;
