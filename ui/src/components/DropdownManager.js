import React, { useEffect, useState } from 'react';

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
    AddCircle as AddIcon,
} from '@mui/icons-material'


function DropdownManager(props) {
    const [options, setOptions] = useState(props.options);
    const [newOption, setNewOption] = useState('');

    useEffect(() => {
        setOptions(props.options)
    }, [props.options])

    function handleSubmit() {
        setOptions([ ...options, newOption ]);
        props.addOption(newOption, props.id);
        setNewOption('');
    }

    function handleDelete(value) {
        const newOptions = options.filter(option => option !== value);
        setOptions(newOptions);
        props.removeOption(value, props.id)
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
                    sx={{ [`& fieldset`]:{ borderRadius: 20 } }}
                    onChange={event => setNewOption(event.target.value)}
                    onKeyPress={ev => {ev.key === 'Enter' && handleSubmit()} }
                />
                <IconButton color='primary' component='label' onClick={handleSubmit} >
                    <AddIcon />
                </IconButton>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column' }} >
                {options && options.map((option, index) => (
                    <Chip
                        key={option + index}
                        label={option}
                        variant='outlined'
                        color='secondary'
                        sx={{ mt: 1, width: 'fit-content' }}
                        onDelete={() => handleDelete(option)}
                    />
                ))}
            </Box>
        </Paper >
    );
}

export default DropdownManager;
