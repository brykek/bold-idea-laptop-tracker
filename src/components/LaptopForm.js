import React, { useState, useEffect } from 'react';

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
    Launch as LaunchIcon,
    Info as InfoIcon,
    Clear as CancelIcon,
    Save as SaveIcon,
} from '@mui/icons-material'


function LaptopForm(props) {
    const [formData, setFormData] = useState({
        serialNumber: '',
        manufacturer: '',
        laptopId: '',
        status: 'UNPROCESSED',
        donor: '',
        dateDonated: '',
        model: '',
        screenSize: '',
        cpuType: '',
        memory: '',
        diskSize: '',
        condition: '',
        chargerType: '',
        chargerIncluded: false,
        tradeInValue: '',
        listPrice: '',
        soldPrice: '',
        notes: '',
    });

    useEffect(() => {
        setFormData({
            serialNumber: props.laptopData?.serialNumber,
            manufacturer: props.laptopData?.manufacturer,
            laptopId: props.laptopData?.laptopId,
            status: props.laptopData?.status,
            donor: props.laptopData?.donor,
            dateDonated: props.laptopData?.dateDonated,
            model: props.laptopData?.model,
            screenSize: props.laptopData?.screenSize,
            cpuType: props.laptopData?.cpuType,
            memory: props.laptopData?.memory,
            diskSize: props.laptopData?.diskSize,
            condition: props.laptopData?.condition,
            chargerType: props.laptopData?.chargerType,
            chargerIncluded: props.laptopData?.chargerIncluded,
            tradeInValue: props.laptopData?.tradeInValue,
            listPrice: props.laptopData?.listPrice,
            soldPrice: props.laptopData?.soldPrice,
            notes: props.laptopData?.notes,
        });
    }, [props.laptopData])
    
    const options = {
        manufacturer: ['Apple', 'PC'],
        status: ['UNPROCESSED', 'DONATED', 'READY', 'INTERNAL', 'RECYCLE', 'REINSTALL', 'SOLD'],
        donor: ['BetterUP', 'OrderMyGear'],
        screenSize: ['12"', '13"', '15"', '16"'],
        memory: ['8 GB', '16 GB', '32 GB'],
        diskSize: ['128 GB', '256 GB', '512 GB', '1024 GB', '1 TB'],
        condition: ['A', 'B', 'C'],
    };

    function handleInputChange(value, field) {
        const updatedData = { ...formData };
        updatedData[field] = value;
        setFormData(updatedData);
    }

    function populateLaptopId() {
        if (formData.serialNumber.length === 12 && formData.laptopId === '') {
            setFormData({ ...formData, laptopId: formData.serialNumber.substring(4, 8) });
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
                    value={formData.serialNumber}
                    label='Serial'
                    size='small'
                    onChange={(event) => handleInputChange(event.target.value, 'serialNumber')}
                    onBlur={populateLaptopId}
                />

                <TextField
                    id='laptop-id-field'
                    value={formData.laptopId}
                    label='Laptop ID'
                    size='small'
                    onChange={(event) => handleInputChange(event.target.value, 'laptopId')}
                />

                {formData.manufacturer === 'Apple' && formData.serialNumber !== '' ?
                    <Button
                        variant='contained'
                        color='secondary'
                        href={`https://everymac.com/ultimate-mac-lookup/?search_keywords=${formData.serialNumber}`}
                        target='_blank'
                        endIcon={<LaunchIcon />}
                        size='small'
                    >Search EveryMac.com</Button>
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
                    value={formData.dateDonated}
                    InputLabelProps={{ shrink: true }}
                    size='small'
                    onChange={(event) => handleInputChange(event.target.value, 'dateDonated')}
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
                        value={formData.screenSize}
                        label='Screen Size'
                        onChange={(event) => handleInputChange(event.target.value, 'screenSize')}
                    >
                        {options.screenSize.map(option => (
                            <MenuItem value={option}>{option}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <TextField
                    id='cpu-type-field'
                    value={formData.cpuType}
                    label='CPU Type'
                    size='small'
                    onChange={(event) => handleInputChange(event.target.value, 'cpuType')}
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
                    <InputLabel id='disk-size-select-label'>Disk Size</InputLabel>
                    <Select
                        required
                        labelId='disk-size-select-label'
                        id='disk-size-select'
                        value={formData.diskSize}
                        label='Disk Size'
                        onChange={(event) => handleInputChange(event.target.value, 'diskSize')}
                    >
                        {options.diskSize.map(option => (
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

                <TextField
                    id='charger-type-field'
                    value={formData.chargerType}
                    label='Charger Type'
                    size='small'
                    onChange={(event) => handleInputChange(event.target.value, 'chargerType')}
                />

                <FormControlLabel label='Charger Included' control={
                    <Switch
                        checked={formData.chargerIncluded}
                        size='small'
                        color='secondary'
                        onChange={(event) => handleInputChange(event.target.checked, 'chargerIncluded')}
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
                    value={formData.value}
                    label='Trade-In Value'
                    size='small'
                    onChange={(event) => handleInputChange(event.target.value, 'value')}
                    InputProps={{ startAdornment: <InputAdornment position='start'>$</InputAdornment> }}
                />

                <TextField
                    id='list-price-field'
                    value={formData.listPrice}
                    label='List Price'
                    size='small'
                    onChange={(event) => handleInputChange(event.target.value, 'listPrice')}
                    InputProps={{ startAdornment: <InputAdornment position='start'>$</InputAdornment> }}
                />

                <TextField
                    id='sold-price-field'
                    value={formData.soldPrice}
                    label='Sold Price'
                    size='small'
                    onChange={(event) => handleInputChange(event.target.value, 'soldPrice')}
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

            <Box sx={{ mb: 2, display: 'flex', flexDirection: 'row', gap: '16px', justifyContent: 'flex-end', alignItems: 'flex-end' }} >
                <Button
                    variant='text'
                    color='error'
                    onClick={props.cancel}
                    startIcon={<CancelIcon />}
                >{props.cancelMessage}</Button>
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