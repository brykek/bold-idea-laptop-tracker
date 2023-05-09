import React, { useState } from 'react';

// MATERIAL-UI COMPONENTS
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
} from '@mui/material';

// MATERIAL ICONS
import {
    ExpandMore as ExpandIcon,
    ExpandLess as CollapseIcon,
} from '@mui/icons-material';


function FilterFields(props) {
    const [expanded, setExpanded] = useState(false);
    function handleChange(value, field) {
        if (!props.filters) return;
        const updatedFilters = { ...props.filters };
        updatedFilters[field] = value;
        props.setFilters(updatedFilters);
    }

    return <>
        <Box sx={{ display: 'grid', gap: 2, mb: 2, gridTemplateColumns: 'repeat(4, 1fr)' }} >
            <TextField
                variant='outlined'
                id='search'
                label='Search All Fields'
                size='small'
                autoComplete='off'
                sx={{ width: '276px' }}
                value={props.filters.search}
                onChange={(event) => handleChange(event.target.value, 'search')}
            />
            <Button
                variant='contained'
                endIcon={expanded ? <CollapseIcon /> : <ExpandIcon />}
                sx={{ ml: 1 }}
                onClick={() => setExpanded(!expanded)}
            >{expanded ? 'Hide Filters' : 'Show More Filters'}</Button>
        </Box>

        {expanded &&
            <Box sx={{ display: 'grid', gap: 2, mb: 2, gridTemplateColumns: 'repeat(4, 1fr)' }} >
                <FormControl variant='outlined' size='small' >
                    <InputLabel id='status-select-label'>Status</InputLabel>
                    <Select
                        labelId='status-select-label'
                        id='status-select'
                        value={props.filters.status}
                        label='Status'
                        onChange={(event) => handleChange(event.target.value, 'status')}
                    >
                        {props.options?.status.map(option => (
                            <MenuItem value={option} >{option}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl variant='outlined' size='small' >
                    <InputLabel id='donated_by-select-label'>Donated By</InputLabel>
                    <Select
                        labelId='donated_by-select-label'
                        id='donated_by-select'
                        value={props.filters.donated_by}
                        label='Donated By'
                        onChange={(event) => handleChange(event.target.value, 'donated_by')}
                    >
                        {props.options?.donated_by.map(option => (
                            <MenuItem value={option}>{option}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl variant='outlined' size='small' >
                    <InputLabel id='screen_size-select-label'>Screen Size</InputLabel>
                    <Select
                        labelId='screen_size-select-label'
                        id='screen_size-select'
                        value={props.filters.screen_size}
                        label='Screen Size'
                        onChange={(event) => handleChange(event.target.value, 'screen_size')}
                    >
                        {props.options?.screen_size.map(option => (
                            <MenuItem value={option}>{option}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl variant='outlined' size='small' >
                    <InputLabel id='memory-select-label'>Memory</InputLabel>
                    <Select
                        labelId='memory-select-label'
                        id='memory-select'
                        value={props.filters.memory}
                        label='Memory'
                        onChange={(event) => handleChange(event.target.value, 'memory')}
                    >
                        {props.options?.memory.map(option => (
                            <MenuItem value={option}>{option}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl variant='outlined' size='small' >
                    <InputLabel id='disk_size-select-label'>Disk Size</InputLabel>
                    <Select
                        labelId='disk_size-select-label'
                        id='disk_size-select'
                        value={props.filters.disk_size}
                        label='Disk Size'
                        onChange={(event) => handleChange(event.target.value, 'disk_size')}
                    >
                        {props.options?.disk_size.map(option => (
                            <MenuItem value={option}>{option}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl variant='outlined' size='small' >
                    <InputLabel id='laptop_condition-select-label'>Condition</InputLabel>
                    <Select
                        labelId='laptop_condition-select-label'
                        id='laptop_condition-select'
                        value={props.filters.laptop_condition}
                        label='Condition'
                        onChange={(event) => handleChange(event.target.value, 'laptop_condition')}
                    >
                        {props.options?.laptop_condition.map(option => (
                            <MenuItem value={option}>{option}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl variant='outlined' size='small' >
                    <InputLabel id='charger_included-select-label'>Charger Included</InputLabel>
                    <Select
                        labelId='charger_included-select-label'
                        id='charger_included-select'
                        value={props.filters.charger_included}
                        label='Charger Included'
                        onChange={(event) => handleChange(event.target.value, 'charger_included')}
                    >
                        {props.options?.charger_included.map(option => (
                            <MenuItem value={option === true ? 'Yes' : 'No'}>{option === true ? 'Yes' : 'No'}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl variant='outlined' size='small' >
                    <InputLabel id='manufacturer-select-label'>Manufacturer</InputLabel>
                    <Select
                        labelId='manufacturer-select-label'
                        id='manufacturer-select'
                        value={props.filters.manufacturer}
                        label='Manufacturer'
                        onChange={(event) => handleChange(event.target.value, 'manufacturer')}
                    >
                        {props.options?.manufacturer.map(option => (
                            <MenuItem value={option}>{option}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
        }
    </>;
}

export default FilterFields;






