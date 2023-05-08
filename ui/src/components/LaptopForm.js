import React, { useState,useEffect } from 'react';
import {convertOptionstoListHelper} from '../util/helpers';
import axios from "axios";

// MATERIAL-UI COMPONENTS
import {
    Typography,
    Box,
    ToggleButtonGroup,
    ToggleButton,
    FormControl,
    Tooltip,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Button,
    FormControlLabel,
    Switch,
    InputAdornment,
    Paper,
    Alert
} from '@mui/material';

// MATERIAL ICONS
import {
    Launch as LaunchIcon,
    Info as InfoIcon,
    Clear as CancelIcon,
    Save as SaveIcon,
} from '@mui/icons-material';

import DropdownManagement from './DropdownManagement';

const emptyOptionsData = {
    manufacturer: [],
    status: [],
    donated_by: [],
    screen_size: [],
    memory: [],
    disk_size: [],
    laptop_condition: [],
};

function LaptopForm(props) {
    const [formData, setFormData] = useState({
        serial_number: '',
        manufacturer: '',
        laptop_id: '',
        status: 'UNPROCESSED',
        donor: '',
        date_donated: '',
        model: '',
        screen_size: '',
        cpu_type: '',
        memory: '',
        disk_size: '',
        laptop_condition: '',
        charger_type: '',
        charger_included: false,
        trade_in_value: '',
        list_price: '',
        sold_price: '',
        notes: '',
    });
    const [missingSerial, setMissingSerial] = useState(false);
    const [missingDonor, setMissingDonor] = useState(false);
    const [missingStatus, setMissingStatus] = useState(false);
    const [showError, setShowError] = useState(false);
    const [options, setOptions] = useState();

    // ------------------------------------------------------------------
    // Copied from DropdownManager.js to get allOptions at the beginnning
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
    // ------------------------------------------------------------------

    useEffect(() => {
        if(!props.laptopData){return}
        setFormData({
            serial_number: props.laptopData?.serial_number,
            manufacturer: props.laptopData?.manufacturer,
            laptop_id: props.laptopData?.laptop_id,
            status: props.laptopData?.status,
            donor: props.laptopData?.donor,
            date_donated: props.laptopData?.date_donated,
            model: props.laptopData?.model,
            screen_size: props.laptopData?.screen_size,
            cpu_type: props.laptopData?.cpu_type,
            memory: props.laptopData?.memory,
            disk_size: props.laptopData?.disk_size,
            laptop_condition: props.laptopData?.laptop_condition,
            charger_type: props.laptopData?.charger_type,
            charger_included: props.laptopData?.charger_included,
            trade_in_value: props.laptopData?.trade_in_value,
            list_price: props.laptopData?.list_price,
            sold_price: props.laptopData?.sold_price,
            notes: props.laptopData?.notes,
        });
    }, [props.laptopData]);

    // const options = {
    //     manufacturer: ['Apple', 'Windows'],
    //     status: ['UNPROCESSED', 'DONATED', 'READY', 'INTERNAL', 'RECYCLE', 'REINSTALL', 'SOLD'],
    //     donated_by: ['BetterUP', 'OrderMyGear'],
    //     screen_size: ['12"', '13"', '15"', '16"'],
    //     memory: ['8 GB', '16 GB', '32 GB'],
    //     disk_size: ['128 GB', '256 GB', '512 GB', '1024 GB'],
    //     laptop_condition: ['A', 'B', 'C'],
    // };

    function checkRequiredFields() {
        setMissingSerial(!formData.serial_number);
        setMissingDonor(!formData.donor);
        setMissingStatus(!formData.status);
    }

    function handleInputChange(value, field) {
        const updatedData = { ...formData };
        updatedData[field] = value;
        setFormData(updatedData);
    }

    function populatelaptop_id() {
        if (formData.serial_number.length === 12 && formData.laptop_id === '') {
            setFormData({ ...formData, laptop_id: formData.serial_number.substring(4, 8) });
        }
    }

    function handleSaveClick() {
        console.log('attempting')
        checkRequiredFields();
        if (!formData.serial_number || !formData.donor || !formData.status) {
            setShowError(true);
        } else {
            setShowError(false);
            props.save(formData);
        }
    }

    return (
        <Paper sx={{ p: 4, pt: 2, mb: 4 }}>
            <Typography variant='h6' sx={{ color: 'primary.main', fontWeight: 'bold', }} gutterBottom >Identification</Typography>
            <Box sx={{ display: 'grid', gap: 2, mb: 2, gridTemplateColumns: 'repeat(4, 1fr)' }} >
                <ToggleButtonGroup
                    exclusive
                    fullWidth
                    size='small'
                    variant='contained'
                    color='secondary'
                    value={formData.manufacturer}
                    onChange={(event) => handleInputChange(event.target.value, 'manufacturer')}
                >
                {options?.manufacturer.map(option => (
                    <ToggleButton disableRipple value={option}>{option}</ToggleButton>
                ))}
                </ToggleButtonGroup>

                <TextField
                    id='serial-field'
                    value={formData.serial_number}
                    label='Serial'
                    required
                    error={missingSerial}
                    size='small'
                    onChange={(event) => handleInputChange(event.target.value, 'serial_number')}
                    onBlur={populatelaptop_id}
                />

                <TextField
                    id='laptop-id-field'
                    value={formData.laptop_id}
                    label='Laptop ID'
                    size='small'
                    onChange={(event) => handleInputChange(event.target.value, 'laptop_id')}
                    onBlur={(event) => handleInputChange(event.target.value, 'laptop_id')}
                />

                {formData.manufacturer === 'Apple' && formData.serial_number!== '' ?
                    <Button
                        variant='contained'
                        color='secondary'
                        href={`https://everymac.com/ultimate-mac-lookup/?search_keywords=${formData.serial_number}`}
                        target='_blank'
                        endIcon={<LaunchIcon />}
                        size='small'
                    >Search EveryMac.com</Button>
                    : <></>
                }
            </Box>

            <Typography variant='h6' sx={{ color: 'primary.main', fontWeight: 'bold', }} gutterBottom >Donation Info</Typography>
            <Box sx={{ display: 'grid', gap: 2, mb: 2, gridTemplateColumns: 'repeat(4, 1fr)' }} >
                <FormControl size='small' required error={missingStatus} >
                    <InputLabel id='status-select-label'>Status</InputLabel>
                    <Select
                        labelId='status-select-label'
                        id='status-select'
                        value={formData.status}
                        label='Status'
                        onChange={(event) => handleInputChange(event.target.value, 'status')}
                    >
                        {options?.status.map(option => {
                            if (['ready', 'donated', 'sold'].includes(option.toLowerCase()) && !formData.value) {
                                return (
                                    <Tooltip followCursor title={`${option} requires Trade-In Value`} >
                                        <span>
                                            <MenuItem
                                                value={option}
                                                disabled
                                            >{option}</MenuItem>
                                        </span>
                                    </Tooltip>
                                );
                            } else {
                                return (
                                    <MenuItem
                                        value={option}
                                    >{option}</MenuItem>
                                );
                            }
                        })}
                    </Select>
                </FormControl>

                <FormControl size='small' required error={missingDonor} >
                    <InputLabel id='donated_by-select-label'>Donated By</InputLabel>
                    <Select
                        required
                        labelId='donated_by-select-label'
                        id='donated_by-select'
                        value={formData.donor}
                        label='Donated By'
                        onChange={(event) => handleInputChange(event.target.value, 'donor')}
                    >
                        {options?.donated_by.map(option => (
                            <MenuItem value={option}>{option}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <TextField
                    id='date'
                    label='Date Donated'
                    type='date'
                    value={formData.date_donated}
                    InputLabelProps={{ shrink: true }}
                    size='small'
                    onChange={(event) => handleInputChange(event.target.value, 'date_donated')}
                />

            </Box>

            <Typography variant='h6' sx={{ color: 'primary.main', fontWeight: 'bold', }} gutterBottom >Laptop Specs</Typography>
            <Box sx={{ display: 'grid', gap: 2, mb: 0, gridTemplateColumns: 'repeat(4, 1fr)' }} >
                <TextField
                    id='model-field'
                    value={formData.model}
                    label='Model'
                    size='small'
                    onChange={(event) => handleInputChange(event.target.value, 'model')}
                />

                <FormControl size='small' >
                    <InputLabel id='screen-size-select-label'>Screen Size</InputLabel>
                    <Select
                        required
                        labelId='screen-size-select-label'
                        id='screen-size-select'
                        value={formData.screen_size}
                        label='Screen Size'
                        onChange={(event) => handleInputChange(event.target.value, 'screen_size')}
                    >
                        {options?.screen_size.map(option => (
                            <MenuItem value={option.slice(0,-1)}>{option}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <TextField
                    id='cpu-type-field'
                    value={formData.cpu_type}
                    label='CPU Type'
                    size='small'
                    onChange={(event) => handleInputChange(event.target.value, 'cpu_type')}
                />

                <FormControl size='small' >
                    <InputLabel id='memory-select-label'>Memory</InputLabel>
                    <Select
                        required
                        labelId='memory-select-label'
                        id='memory-select'
                        value={formData.memory}
                        label='Memory'
                        onChange={(event) => handleInputChange(event.target.value, 'memory')}
                    >
                        {options?.memory.map(option => (
                            <MenuItem value={option.slice(0,-3)}>{option}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl size='small' >
                    <InputLabel id='disk-size-select-label'>Disk Size</InputLabel>
                    <Select
                        required
                        labelId='disk-size-select-label'
                        id='disk-size-select'
                        value={formData.disk_size}
                        label='Disk Size'
                        onChange={(event) => handleInputChange(event.target.value, 'disk_size')}
                    >
                        {options?.disk_size.map(option => (
                            <MenuItem value={option.slice(0,-3)}>{option}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl size='small' >
                    <InputLabel id='laptop_condition-select-label'>Condition</InputLabel>
                    <Select
                        required
                        labelId='laptop_condition-select-label'
                        id='laptop_condition-select'
                        value={formData.laptop_condition}
                        label='Condition'
                        onChange={(event) => handleInputChange(event.target.value, 'laptop_condition')}
                    >
                        {options?.laptop_condition.map(option => (
                            <MenuItem value={option}>{option}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <TextField
                    id='charger-type-field'
                    value={formData.charger_type}
                    label='Charger Type'
                    size='small'
                    onChange={(event) => handleInputChange(event.target.value, 'charger_type')}
                />

                <FormControlLabel label='Charger Included' control={
                    <Switch
                        checked={formData.charger_included}
                        size='small'
                        color='secondary'
                        onChange={(event) => handleInputChange(event.target.checked, 'charger_included')}
                    />
                } />

            </Box>
            <Box sx={{ display: 'grid', gap: 2, mb: 1, gridTemplateColumns: 'repeat(4, 1fr)' }} >
                <Typography variant='caption' >
                    {/* Spacer */}
                </Typography>

                <Typography color='secondary' variant='caption' component='a' href='https://www.pcexchange.com/blog/all-about-the-grading-system-of-refurbished-laptops/' target='_blank' sx={{ textDecoration: 'none', pl: 1 }} >
                    <InfoIcon sx={{ fontSize: 10, mr: 0.5 }} />
                    Read about the grading system
                </Typography>
            </Box>

            <Typography variant='h6' sx={{ color: 'primary.main', fontWeight: 'bold', }} gutterBottom >Value & Sale</Typography>
            <Box sx={{ display: 'grid', gap: 2, mb: 2, gridTemplateColumns: 'repeat(4, 1fr)' }} >
                <TextField
                    id='value-field'
                    value={formData.trade_in_value}
                    label='Trade-In Value'
                    size='small'
                    onChange={(event) => handleInputChange(event.target.value, 'trade_in_value')}
                    InputProps={{ startAdornment: <InputAdornment position='start'>$</InputAdornment> }}
                />

                <TextField
                    id='list-price-field'
                    value={formData.list_price}
                    label='List Price'
                    size='small'
                    onChange={(event) => handleInputChange(event.target.value, 'list_price')}
                    InputProps={{ startAdornment: <InputAdornment position='start'>$</InputAdornment> }}
                />

                <TextField
                    id='sold-price-field'
                    value={formData.sold_price}
                    label='Sold Price'
                    size='small'
                    onChange={(event) => handleInputChange(event.target.value, 'sold_price')}
                    InputProps={{ startAdornment: <InputAdornment position='start'>$</InputAdornment> }}
                />

            </Box>

            <Typography variant='h6' sx={{ color: 'primary.main', fontWeight: 'bold', }} gutterBottom >Notes</Typography>
            <Box sx={{ display: 'grid', gap: 2, mb: 2, gridTemplateColumns: 'repeat(2, 1fr)' }} >
                <TextField
                    id='notes-field'
                    multiline
                    rows={2}
                    value={formData.notes}
                    size='small'
                    onChange={(event) => handleInputChange(event.target.value, 'notes')}
                />

                <Box sx={{ display: 'flex', flexDirection: 'column' }} >
                    {formData.created_date && <Typography sx={{ fontSize: '12px', color: 'primary.light' }} >Record Created: {formData.created_date}</Typography>}
                    {formData.last_updated && <Typography sx={{ fontSize: '12px', color: 'primary.light' }} >Last Updated: {formData.last_updated}</Typography>}
                    {formData.archived_date && <Typography sx={{ fontSize: '12px', color: 'primary.light' }} >Archived: {formData.archived_date}</Typography>}
                </Box>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '16px' }} >
                <Alert severity="error" sx={showError && missingSerial ? {} : { display: 'none' }} >'Serial' is a required field.</Alert>
                <Alert severity="error" sx={showError && missingDonor ? {} : { display: 'none' }} >'Donated By' is a required field.</Alert>
                <Alert severity="error" sx={showError && missingStatus ? {} : { display: 'none' }} >'Status' is a required field.</Alert>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'row', gap: '16px', justifyContent: 'flex-end', alignItems: 'flex-end', marginBottom: '16px' }} >
                <Button
                    variant='text'
                    color='error'
                    onClick={props.cancel}
                    startIcon={<CancelIcon />}
                >{props.cancelMessage}</Button>
                <Button
                    variant='contained'
                    color='secondary'
                    onClick={handleSaveClick}
                    startIcon={<SaveIcon />}
                >{props.saveMessage}</Button>
            </Box>

        </Paper>
    );
}

export default LaptopForm;