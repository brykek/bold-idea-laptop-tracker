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
            {props.filters.donated_by &&
                <Chip
                    label={<span>Donated By: <strong>{props.filters.donated_by}</strong></span>}
                    variant='contained'
                    color='primary'
                    sx={{ mr: 1, mb: 1, width: 'fit-content' }}
                    onDelete={() => handleDelete('donated_by')}
                />
            }
            {props.filters.screen_size &&
                <Chip
                    label={<span>Screen Size: <strong>{props.filters.screen_size}</strong></span>}
                    variant='contained'
                    color='primary'
                    sx={{ mr: 1, mb: 1, width: 'fit-content' }}
                    onDelete={() => handleDelete('screen_size')}
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
            {props.filters.disk_size &&
                <Chip
                    label={<span>Disk Size: <strong>{props.filters.disk_size}</strong></span>}
                    variant='contained'
                    color='primary'
                    sx={{ mr: 1, mb: 1, width: 'fit-content' }}
                    onDelete={() => handleDelete('disk_size')}
                />
            }
            {props.filters.laptop_condition &&
                <Chip
                    label={<span>Condition: <strong>{props.filters.laptop_condition}</strong></span>}
                    variant='contained'
                    color='primary'
                    sx={{ mr: 1, mb: 1, width: 'fit-content' }}
                    onDelete={() => handleDelete('laptop_condition')}
                />
            }
            {props.filters.charger_included &&
                <Chip
                    label={<span>Charger Included: <strong>{props.filters.charger_included}</strong></span>}
                    variant='contained'
                    color='primary'
                    sx={{ mr: 1, mb: 1, width: 'fit-content' }}
                    onDelete={() => handleDelete('charger_included')}
                />
            }
        </Box>
    );
}

export default FilterChips;
