import React, { useEffect, useState } from 'react';
import DropdownManager from './DropdownManager';
import {convertOptionstoListHelper, formatHeader} from '../util/helpers';
import axios from "axios";

// MATERIAL-UI COMPONENTS
import {
    Typography,
    Box,
} from '@mui/material';

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
        console.log(`Getting options...`)
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
            const response = await axios.get("http://localhost:3001/" + dropdown);
            return convertOptionstoListHelper(response.data);
        } catch (err) {
            console.error("Failed to load inventory");
            throw err;
        }
    }

    async function addOption(value, category) {
        console.log(`Adding \"${value}\" to the list of \"${category}\" options...`);
        try {
            await axios.put("http://localhost:3001/" + category + "/" + value);
            getAllOptions();
            Promise.resolve();
        } catch (err) {
            console.error("Failed to add option");
            throw err;
        }

    }

    async function removeOption(value, category) {
        console.log(`Removing \"${value}\" from the list of \"${category}\" options...`);
        try {
            await axios.delete("http://localhost:3001/" + category + "/" + value);
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