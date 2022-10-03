import React, { useState } from 'react';

// MATERIAL-UI COMPONENTS
import {
    Typography,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
} from '@mui/material';

function FilterFields(props) {
    const [q, setQ] = useState("");
    const [status, setStatus] = useState("");
    const [donor, setDonor] = useState("");
    const options = {
        status: ['UNPROCESSED', 'DONATED', 'READY', 'INTERNAL', 'RECYCLE', 'REINSTALL', 'SOLD'],
        donor: ['BetterUP', 'OrderMyGear'],
        condition: ['A', 'B', 'C'],
    };

    return (
        
        <>
            <Typography variant='h6' sx={{ color: 'primary.main', fontWeight: 'bold', }} gutterBottom >Filter By:</Typography>
            <Box sx={{ display: 'grid', gap: 2, mb: 2, gridTemplateColumns: 'repeat(4, 1fr)' }} > 
            <TextField
                    id='search'
                    label='Search'
                    size='small'
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                />
            <FormControl size='small' >
                    <InputLabel id='status-select-label'>Status</InputLabel>
                    <Select
                        required
                        labelId='status-select-label'
                        id='status-select'
                        value={status}
                        label='Status'
                        onChange={(e) => setStatus(e.target.value)}
                        >
                        {options.status.map(option => (
                            <MenuItem value={option}>{option}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl size='small' >
                    <InputLabel id='donor-select-label'>Donated By</InputLabel>
                    <Select
                        required
                        labelId='donor-select-label'
                        id='donor-select'
                        value={donor}
                        label='Donated By'
                        onChange={(e) => setDonor(e.target.value)}
                    >
                        {options.donor.map(option => (
                            <MenuItem value={option}>{option}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
        </>
    );
}

export default FilterFields;






