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
                    <InputLabel id='donatedBy-select-label'>Donated By</InputLabel>
                    <Select
                        labelId='donatedBy-select-label'
                        id='donatedBy-select'
                        value={props.filters.donatedBy}
                        label='Donated By'
                        onChange={(event) => handleChange(event.target.value, 'donatedBy')}
                    >
                        {props.options?.donatedBy.map(option => (
                            <MenuItem value={option}>{option}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl variant='outlined' size='small' >
                    <InputLabel id='screenSize-select-label'>Screen Size</InputLabel>
                    <Select
                        labelId='screenSize-select-label'
                        id='screenSize-select'
                        value={props.filters.screenSize}
                        label='Screen Size'
                        onChange={(event) => handleChange(event.target.value, 'screenSize')}
                    >
                        {props.options?.screenSize.map(option => (
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
                    <InputLabel id='diskSize-select-label'>Disk Size</InputLabel>
                    <Select
                        labelId='diskSize-select-label'
                        id='diskSize-select'
                        value={props.filters.diskSize}
                        label='Disk Size'
                        onChange={(event) => handleChange(event.target.value, 'diskSize')}
                    >
                        {props.options?.diskSize.map(option => (
                            <MenuItem value={option}>{option}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl variant='outlined' size='small' >
                    <InputLabel id='condition-select-label'>Condition</InputLabel>
                    <Select
                        labelId='condition-select-label'
                        id='condition-select'
                        value={props.filters.condition}
                        label='Condition'
                        onChange={(event) => handleChange(event.target.value, 'condition')}
                    >
                        {props.options?.condition.map(option => (
                            <MenuItem value={option}>{option}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl variant='outlined' size='small' >
                    <InputLabel id='chargerIncluded-select-label'>Charger Included</InputLabel>
                    <Select
                        labelId='chargerIncluded-select-label'
                        id='chargerIncluded-select'
                        value={props.filters.chargerIncluded}
                        label='Charger Included'
                        onChange={(event) => handleChange(event.target.value, 'chargerIncluded')}
                    >
                        {props.options?.chargerIncluded.map(option => (
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






