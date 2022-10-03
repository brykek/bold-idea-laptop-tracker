import React, { useState } from 'react';

// MATERIAL-UI COMPONENTS
import {
    Typography,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';

function FilterFields(props) {
    const [formData, setFormData] = useState(props.laptopData || {
        status: '',
        donor: '',
        condition: '',
    });
    const options = {
        status: ['UNPROCESSED', 'DONATED', 'READY', 'INTERNAL', 'RECYCLE', 'REINSTALL', 'SOLD'],
        donor: ['BetterUP', 'OrderMyGear'],
        condition: ['A', 'B', 'C'],
    };

    function handleInputChange(value, field) {
        const updatedData = { ...formData };
        updatedData[field] = value;
        setFormData(updatedData);
    }

    return (
        <>
            <Typography variant='h6' sx={{ color: 'primary.main', fontWeight: 'bold', }} gutterBottom >Filter By:</Typography>
            <Box sx={{ display: 'grid', gap: 2, mb: 2, gridTemplateColumns: 'repeat(4, 1fr)' }} > 
            <FormControl size='small' >
                    <InputLabel id='status-select-label'>Status</InputLabel>
                    <Select
                        required
                        labelId='status-select-label'
                        id='status-select'
                        value={formData.status}
                        label='Status'
                        onChange={(event) => handleInputChange(event.target.value, 'status')}
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
                        value={formData.donor}
                        label='Donated By'
                        onChange={(event) => handleInputChange(event.target.value, 'donor')}
                    >
                        {options.donor.map(option => (
                            <MenuItem value={option}>{option}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl size='small' >
                    <InputLabel id='condition-select-label'>Condition</InputLabel>
                    <Select
                        required
                        labelId='condition-select-label'
                        id='condition-select'
                        value={formData.condition}
                        label='Condition'
                        onChange={(event) => handleInputChange(event.target.value, 'condition')}
                    >
                        {options.condition.map(option => (
                            <MenuItem value={option}>{option}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

            </Box>
        </>
    );
}

export default FilterFields;