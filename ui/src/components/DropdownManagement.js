import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Typography,
    Box,
} from '@mui/material';

import DropdownManager from './DropdownManager';
import { bearerTokenConfig, convertOptionstoListHelper, formatHeader } from '../util/helpers';

const emptyOptionsData = {
    manufacturer: [],
    status: [],
    donated_by: [],
    screen_size: [],
    memory: [],
    disk_size: [],
    laptop_condition: [],
};

function DropdownManagement() {
    const [options, setOptions] = useState();

    useEffect(() => {
        getAllOptions();
    }, []);

    async function getAllOptions() {
        let optionsData = emptyOptionsData;
      
        for (const key of Object.keys(optionsData)) {
          const value = await getOptionsForDropdown(key);
          optionsData[key] = value;
        }
        setOptions(optionsData);
    }
    
    async function getOptionsForDropdown(dropdown) {
        try {
            const response = await axios.get("http://localhost:3001/" + dropdown, bearerTokenConfig);
            return convertOptionstoListHelper(response.data);
        } catch (err) {
            console.error("Failed to load inventory");
            throw err;
        }
    }

    async function addOption(value, category) {
        try {
            await axios.put("http://localhost:3001/" + category + "/" + value, {}, bearerTokenConfig);
            getAllOptions();
            Promise.resolve();
        } catch (err) {
            console.error("Failed to add option");
            throw err;
        }
    }

    async function removeOption(value, category) {
        try {
            await axios.delete("http://localhost:3001/" + category + "/" + value, bearerTokenConfig);
            getAllOptions();
            Promise.resolve();
        } catch (err) {
            console.error("Failed to delete option");
            throw err;
        }
    }

    return <>
        <Typography variant='h6' sx={{ color: 'primary.dark', fontWeight: 'bold' }} gutterBottom >Manage Dropdown Options</Typography>
        <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: 'repeat(5, 1fr)' }} >
            {options && Object.keys(options).map((key) => (
                <DropdownManager
                    key = {key}
                    header={formatHeader(key)}
                    id={key}
                    options={options[key]}
                    addOption={addOption}
                    removeOption={removeOption}
                />
            ))}

        </Box>
    </>;
}

export default DropdownManagement;
