import React from 'react';

// MATERIAL-UI COMPONENTS
import {
    Box,
    Chip,
} from '@mui/material';

function FilterChips(props) {
    function handleDelete(category) {
        const newFilters = { ...props.filters };
        newFilters[category] = '';
        props.setFilters(newFilters);
    }

    if (!props.filters) return <></>;

    return (
        <Box sx={{ mb: 2 }} >
            {props.filters.search &&
                <Chip
                    label={<span>Search: <strong>{props.filters.search}</strong></span>}
                    variant='contained'
                    color='primary'
                    sx={{ mr: 1, mb: 1, width: 'fit-content' }}
                    onDelete={() => handleDelete('search')}
                />
            }
            {props.filters.manufacturer &&
                <Chip
                    label={<span>Manufacturer: <strong>{props.filters.manufacturer}</strong></span>}
                    variant='contained'
                    color='primary'
                    sx={{ mr: 1, mb: 1, width: 'fit-content' }}
                    onDelete={() => handleDelete('manufacturer')}
                />
            }
            {props.filters.status &&
                <Chip
                    label={<span>Status: <strong>{props.filters.status}</strong></span>}
                    variant='contained'
                    color='primary'
                    sx={{ mr: 1, mb: 1, width: 'fit-content' }}
                    onDelete={() => handleDelete('status')}
                />
            }
            {props.filters.donatedBy &&
                <Chip
                    label={<span>Donated By: <strong>{props.filters.donatedBy}</strong></span>}
                    variant='contained'
                    color='primary'
                    sx={{ mr: 1, mb: 1, width: 'fit-content' }}
                    onDelete={() => handleDelete('donatedBy')}
                />
            }
            {props.filters.screenSize &&
                <Chip
                    label={<span>Screen Size: <strong>{props.filters.screenSize}</strong></span>}
                    variant='contained'
                    color='primary'
                    sx={{ mr: 1, mb: 1, width: 'fit-content' }}
                    onDelete={() => handleDelete('screenSize')}
                />
            }
            {props.filters.memory &&
                <Chip
                    label={<span>Memory: <strong>{props.filters.memory}</strong></span>}
                    variant='contained'
                    color='primary'
                    sx={{ mr: 1, mb: 1, width: 'fit-content' }}
                    onDelete={() => handleDelete('memory')}
                />
            }
            {props.filters.diskSize &&
                <Chip
                    label={<span>Disk Size: <strong>{props.filters.diskSize}</strong></span>}
                    variant='contained'
                    color='primary'
                    sx={{ mr: 1, mb: 1, width: 'fit-content' }}
                    onDelete={() => handleDelete('diskSize')}
                />
            }
            {props.filters.condition &&
                <Chip
                    label={<span>Condition: <strong>{props.filters.condition}</strong></span>}
                    variant='contained'
                    color='primary'
                    sx={{ mr: 1, mb: 1, width: 'fit-content' }}
                    onDelete={() => handleDelete('condition')}
                />
            }
            {props.filters.chargerIncluded &&
                <Chip
                    label={<span>Charger Included: <strong>{props.filters.chargerIncluded}</strong></span>}
                    variant='contained'
                    color='primary'
                    sx={{ mr: 1, mb: 1, width: 'fit-content' }}
                    onDelete={() => handleDelete('chargerIncluded')}
                />
            }
        </Box>
    );
}

export default FilterChips;






