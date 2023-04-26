import React from 'react';

// MATERIAL-UI COMPONENTS
import {
    Modal,
    Box,
    Typography,
    Chip,
    Button,
    IconButton,
} from '@mui/material';

// MATERIAL ICONS
import {
    Close as CloseIcon,
} from '@mui/icons-material';


function LaptopDetailModal(props) {

    return (
        <Modal open={props.open} onClose={props.close} >
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 800, maxHewight: '100vh', bgcolor: 'background.paper', borderRadius: '16px', boxShadow: 24, p: 2, alignContent: 'center', }} >
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} >
                    <IconButton size='small' onClick={props.close}><CloseIcon /></IconButton>
                </Box>
                <Typography align='center' variant='h5' component='h2' sx={{ color: 'primary.dark', fontWeight: 'bold' }} >Laptop Detail</Typography>

                <Box sx={{ overflowY: 'scroll', ml: 2, mr: 2, mb: 2 }}>
                    <Typography variant='h6' sx={{ color: 'secondary.dark', fontWeight: 'bold', }} gutterBottom >Identification</Typography>
                    <Box sx={{ display: 'grid', gap: 1, mb: 1, gridTemplateColumns: 'repeat(3, 1fr)' }} >
                        <Typography color={props.laptop?.serial ? 'primary.dark' : 'default.light'} >
                            Serial: <strong>{props.laptop?.serial}</strong>
                        </Typography>
                        <Typography color={props.laptop?.laptopId ? 'primary.dark' : 'default.light'} >
                            Laptop ID: <strong>{props.laptop?.laptopId}</strong>
                        </Typography>
                        <Typography color={props.laptop?.manufacturer ? 'primary.dark' : 'default.light'} >
                            Manufacturer: <Chip color='primary' label={props.laptop?.manufacturer} />
                        </Typography>
                    </Box>

                    <Typography variant='h6' sx={{ color: 'secondary.dark', fontWeight: 'bold', }} gutterBottom >Donation Info</Typography>
                    <Box sx={{ display: 'grid', gap: 1, mb: 1, gridTemplateColumns: 'repeat(3, 1fr)' }} >
                        <Typography color={props.laptop?.status ? 'primary.dark' : 'default.light'} >
                            Status: <Chip color='primary' label={props.laptop?.status} />
                        </Typography>
                        <Typography color={props.laptop?.donatedBy ? 'primary.dark' : 'default.light'} >
                            Donated By: <Chip color='primary' label={props.laptop?.donatedBy} />
                        </Typography>
                        <Typography color={props.laptop?.dateDonated ? 'primary.dark' : 'default.light'} >
                            Date Donated: <strong>{props.laptop?.dateDonated}</strong>
                        </Typography>
                    </Box>

                    <Typography variant='h6' sx={{ color: 'secondary.dark', fontWeight: 'bold', }} gutterBottom >Laptop Specs</Typography>
                    <Box sx={{ display: 'grid', gap: 1, mb: 1, gridTemplateColumns: 'repeat(3, 1fr)' }} >
                        <Typography color={props.laptop?.model ? 'primary.dark' : 'default.light'} >
                            Model: <strong>{props.laptop?.model}</strong>
                        </Typography>
                        <Typography color={props.laptop?.screenSize ? 'primary.dark' : 'default.light'} >
                            Screen Size: <Chip color='primary' label={props.laptop?.screenSize} />
                        </Typography>
                        <Typography color={props.laptop?.cpuType ? 'primary.dark' : 'default.light'} >
                            CPU Type: <strong>{props.laptop?.cpuType}</strong>
                        </Typography>
                        <Typography color={props.laptop?.memory ? 'primary.dark' : 'default.light'} >
                            Memory: <Chip color='primary' label={props.laptop?.memory} />
                        </Typography>
                        <Typography color={props.laptop?.diskSize ? 'primary.dark' : 'default.light'} >
                            Disk Size: <Chip color='primary' label={props.laptop?.diskSize} />
                        </Typography>
                        <Typography color={props.laptop?.condition ? 'primary.dark' : 'default.light'} >
                            Condition: <Chip color='primary' label={props.laptop?.condition} />
                        </Typography>
                        <Typography color={props.laptop?.chargerType ? 'primary.dark' : 'default.light'} >
                            Charger Type: <strong>{props.laptop?.chargerType}</strong>
                        </Typography>
                        <Chip color='primary' sx={{ width: 'fit-content' }} label={props.laptop?.chargerIncluded ? 'Has Charger' : "Does Not Have Charger"} />
                    </Box>

                    <Typography variant='h6' sx={{ color: 'secondary.dark', fontWeight: 'bold', }} gutterBottom >Value & Sale</Typography>
                    <Box sx={{ display: 'grid', gap: 1, mb: 1, gridTemplateColumns: 'repeat(3, 1fr)' }} >
                        <Typography color={props.laptop?.value ? 'primary.dark' : 'default.light'} >
                            Trade In Value: <strong>${props.laptop?.value}</strong>
                        </Typography>
                        <Typography color={props.laptop?.listPrice ? 'primary.dark' : 'default.light'} >
                            List Price: <strong>${props.laptop?.listPrice}</strong>
                        </Typography>
                        <Typography color={props.laptop?.soldPrice ? 'primary.dark' : 'default.light'} >
                            Sold Price: <strong>${props.laptop?.soldPrice}</strong>
                        </Typography>
                    </Box>

                    <Typography variant='h6' sx={{ color: 'secondary.dark', fontWeight: 'bold', }} gutterBottom >Notes</Typography>
                    <Box sx={{ display: 'grid', gap: 1, mb: 1, gridTemplateColumns: 'repeat(3, 1fr)' }} >
                        <Typography
                            sx={{ fontWeight: props.laptop?.notes ? 'bold' : '' }}
                            color={props.laptop?.notes ? 'primary.dark' : 'default.light'}
                        >
                            {props.laptop?.notes ? props.laptop?.notes : 'Edit this laptop to add notes...'}
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'center' }} >
                        <Button
                            variant='contained'
                            align='center'
                            color='secondary'
                            href={`/edit/${props.laptop?.serial}`}
                        >Edit Laptop</Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    )
}

export default LaptopDetailModal;