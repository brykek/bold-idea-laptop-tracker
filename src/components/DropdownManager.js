import React, { useState } from 'react';

// MATERIAL-UI COMPONENTS
import {
    Typography,
    Paper,
    TextField,
    Chip,
    Box,
    IconButton,
} from '@mui/material';

// MATERIAL ICONS
import {
    AddBox as AddIcon,
} from '@mui/icons-material'


function DropdownManager(props) {
    const [newOption, setNewOption] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        props.addOption(newOption, props.id);
    }

    function handleDelete(option) {
        props.removeOption(option, props.id)
    }

    return (
        <Paper sx={{ display: 'flex', flexDirection: 'column', p: 2, borderRadius: '16px', gap: 1 }} >
            <Typography align='center' color='primary.dark' fontWeight='bold' gutterBottom >{props.header}</Typography>

            <Box sx={{ display: 'flex', flexDirection: 'row' }} >
                <TextField
                    id={props.id}
                    placeholder='Add option...'
                    variant='outlined'
                    size='small'
                    value={newOption}
                    onChange={event => setNewOption(event.target.value)}
                    onSubmit={event => handleSubmit(event)}
                />
                <IconButton color='secondary' component="label">
                    <AddIcon />
                </IconButton>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column' }} >
                {props.options && props.options.map(option => (
                    <Chip
                        label={option}
                        variant='outlined'
                        color='secondary'
                        sx={{ mt: 1, width: 'fit-content' }}
                        onDelete={() => handleDelete(option)}
                    />
                ))}
            </Box>
        </Paper>
    );
}

export default DropdownManager;
