import React, { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    Container,
    Typography,
} from '@mui/material';

import LaptopForm from '../components/LaptopForm';
import { bearerTokenConfig } from '../util/helpers';

function EditLaptopPage(props) {
    const navigate = useNavigate()
    const [loading,setLoading] = useState(true)
    const [laptopData, setLaptopData] = useState(null);
    const {id}  = useParams();

    useEffect(() => {
        if (!laptopData) {
            axios.get(
                `http://localhost:3001/inventory/${id}`,
                bearerTokenConfig
            ).then((res)=> { 
                setLaptopData(res.data);
                setLoading(false)
            }).catch((err) => {
                console.error(err);
                alert('Something went wrong!');
                navigate('/inventory');
            });
        }
    }, [id])

    function updateLaptop(laptopData) {
        axios.put(
            `http://localhost:3001/edit/${id}`,
            laptopData,
            bearerTokenConfig
        ).then(()=>{
            alert('Laptop Updated Successfully!');
            navigate('/inventory');
        }).catch((err) => {
            console.error(err);
            alert("Something went wrong.");
        });
    }

    function discardChanges() {
        navigate('/inventory');
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
