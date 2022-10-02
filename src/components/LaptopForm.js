import React, { useState } from 'react';

// MATERIAL-UI COMPONENTS
import {
    Typography,
    Box,
    ToggleButtonGroup,
    ToggleButton,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Button,
    FormControlLabel,
    Switch,
    InputAdornment,
} from '@mui/material';

// MATERIAL ICONS
import {
    Launch as Launch,
    Info as InfoIcon,
    Clear as DiscardIcon,
    Save as SaveIcon,
} from '@mui/icons-material'


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
        condition: '',
        charger_type: '',
        charger_included: '',
        trade_in_value: '',
        list_price: '',
        sold_price: '',
        notes: '',
        created_date: '',
        last_updates: '',
        archived_date: '',
    });
    const options = {
        manufacturer: ['Apple', 'PC'],
        status: ['UNPROCESSED', 'DONATED', 'READY', 'INTERNAL', 'RECYCLE', 'REINSTALL', 'SOLD'],
        donor: ['BetterUP', 'OrderMyGear'],
        screen_size: ['12"', '13"', '15"', '16"'],
        memory: ['8 GB', '16 GB', '32 GB'],
        disk_size: ['128 GB', '256 GB', '512 GB', '1024 GB', '1 TB'],
        condition: ['A', 'B', 'C'],
    };

    function handleInputChange(value, field) {
        const updatedData = { ...formData };
        updatedData[field] = value;
        setFormData(updatedData);
    }

    function populateLaptopId() {
        if (formData.serial_number.length === 12 && formData.laptop_id === '') {
            setFormData({ ...formData, laptop_id: formData.serial_number.substring(4, 8) });
        }
    }

    return (
        <>
            <Typography variant='h6' sx={{ color: 'primary.main', fontWeight: 'bold', }} gutterBottom >Identification</Typography>
            <Box sx={{ display: 'grid', gap: 2, mb: 2, gridTemplateColumns: 'repeat(4, 1fr)' }} >
                <ToggleButtonGroup
                    exclusive
                    fullWidth
                    size='small'
                    color='secondary'
                    value={formData.manufacturer}
                    onChange={(event) => handleInputChange(event.target.value, 'manufacturer')}
                >
                    <ToggleButton disableRipple value='Apple' >Apple</ToggleButton>
                    <ToggleButton disableRipple value='PC' >PC</ToggleButton>
                </ToggleButtonGroup>

                <TextField
                    id='serial-field'
                    value={formData.serial_number}
                    label='Serial'
                    size='small'
                    onChange={(event) => handleInputChange(event.target.value, 'serial_number')}
                    onBlur={populateLaptopId}
                />

                <TextField
                    id='laptop-id-field'
                    value={formData.laptop_id}
                    label='Laptop ID'
                    size='small'
                    onChange={(event) => handleInputChange(event.target.value, 'laptop_id')}
                />

                {formData.manufacturer === 'Apple' && formData.serial_number !== '' ?
                    <Button
                        variant='contained'
                        color='secondary'
                        href={`https://everymac.com/ultimate-mac-lookup/?search_keywords=${formData.serial_number}`}
                        target='_blank'
                        endIcon={<Launch />}
                        size='small'
                    >Find on EveryMac.com</Button>
                    : <></>
                }
            </Box>

            <Typography variant='h6' sx={{ color: 'primary.main', fontWeight: 'bold', }} gutterBottom >Donation Info</Typography>
            <Box sx={{ display: 'grid', gap: 2, mb: 2, gridTemplateColumns: 'repeat(4, 1fr)' }} >
                <FormControl size='small' >
                    <InputLabel id='status-select-label'>Status</InputLabel>
                    <Select
                        required
                        labelId='status-select-label'
                        id='status-select'
                        value={formData.status}
                        label='Status'
                        onChange={(event) => handleInputChange(event.target.value, 'status')}
                    >
                        {options.status.map(option => (
                            <MenuItem value={option}>{option}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl size='small' >
                    <InputLabel id='donor-select-label'>Donated By</InputLabel>
                    <Select
                        required
                        labelId='donor-select-label'
                        id='donor-select'
                        value={formData.donor}
                        label='Donated By'
                        onChange={(event) => handleInputChange(event.target.value, 'donor')}
                    >
                        {options.donor.map(option => (
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
                        {options.screen_size.map(option => (
                            <MenuItem value={option}>{option}</MenuItem>
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
                        {options.memory.map(option => (
                            <MenuItem value={option}>{option}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl size='small' >
                    <InputLabel id='condition-select-label'>Condition</InputLabel>
                    <Select
                        required
                        labelId='condition-select-label'
                        id='condition-select'
                        value={formData.condition}
                        label='Condition'
                        onChange={(event) => handleInputChange(event.target.value, 'condition')}
                    >
                        {options.condition.map(option => (
                            <MenuItem value={option}>{option}</MenuItem>
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
                        {options.disk_size.map(option => (
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
            <Box sx={{ display: 'grid', gap: 2, mb: 2, gridTemplateColumns: 'repeat(4, 1fr)' }} >
                <Typography color='secondary' variant='caption' component='a' href='https://www.pcexchange.com/blog/all-about-the-grading-system-of-refurbished-laptops/' target='_blank' sx={{ textDecoration: 'none' }} >
                    <InfoIcon sx={{ fontSize: 10, mr: 0.5 }} />
                    Read about the grading system
                </Typography>
            </Box>

            <Typography variant='h6' sx={{ color: 'primary.main', fontWeight: 'bold', }} gutterBottom >Value & Sale</Typography>
            <Box sx={{ display: 'grid', gap: 2, mb: 2, gridTemplateColumns: 'repeat(4, 1fr)' }} >
                <TextField
                    id='value-field'
                    value={formData.value}
                    label='Trade-In Value'
                    size='small'
                    onChange={(event) => handleInputChange(event.target.value, 'value')}
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
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'row', gap: '16px', justifyContent: 'flex-end', alignItems: 'flex-end' }} >
                <Button
                    variant='outlined'
                    color='error'
                    onClick={props.discard}
                    startIcon={<DiscardIcon />}
                >{props.discardMessage}</Button>
                <Button
                    variant='contained'
                    color='secondary'
                    onClick={() => props.save(formData)}
                    startIcon={<SaveIcon />}
                >{props.saveMessage}</Button>
            </Box>
        </>
    );
}

export default LaptopForm;