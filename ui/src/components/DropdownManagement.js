import React, { useEffect, useState } from 'react';
import DropdownManager from './DropdownManager';
import {convertOptionstoListHelper} from '../util/helpers';
import axios from "axios";

// MATERIAL-UI COMPONENTS
import {
    Typography,
    Box,
} from '@mui/material';

const dummyOptionData = {
    manufacturer: ['Apple', 'PC'],
    status: ['UNPROCESSED', 'DONATED', 'READY', 'INTERNAL', 'RECYCLE', 'REINSTALL', 'SOLD'],
    donated_by: ['BetterUP', 'OrderMyGear'],
    screen_size: ['12"', '13"', '15"', '16"'],
    memory: ['8 GB', '16 GB', '32 GB'],
    disk_size: ['128 GB', '256 GB', '512 GB', '1024 GB', '1 TB'],
    laptop_condition: ['A', 'B', 'C'],
};

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
            <DropdownManager
                header='Status'
                id='status'
                options={options?.status}
                addOption={addOption}
                removeOption={removeOption}
            />
            <DropdownManager
                header='Disk Size'
                id='disk_size'
                options={options?.disk_size}
                addOption={addOption}
                removeOption={removeOption}
            />
            <DropdownManager
                header='Screen Size'
                id='screen_size'
                options={options?.screen_size}
                addOption={addOption}
                removeOption={removeOption}
            />
            <DropdownManager
                header='Memory'
                id='memory'
                options={options?.memory}
                addOption={addOption}
                removeOption={removeOption}
            />
            <DropdownManager
                header='Condition'
                id='laptop_condition'
                options={options?.laptop_condition}
                addOption={addOption}
                removeOption={removeOption}
            />
            <DropdownManager
                header='Manufacturer'
                id='manufacturer'
                options={options?.manufacturer}
                addOption={addOption}
                removeOption={removeOption}
            />
            <DropdownManager
                header='Donated By'
                id='donated_by'
                options={options?.donated_by}
                addOption={addOption}
                removeOption={removeOption}
            />
        </Box>
    </>;
}

export default DropdownManagement;