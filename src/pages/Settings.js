import React, { useEffect, useState } from 'react';
import DropdownManager from '../components/DropdownManager';

// MATERIAL-UI COMPONENTS
import {
    Container,
    Typography,
    Paper,
    Table,
    TableContainer,
    TableRow,
    TableCell,
    TableHead,
    TableBody,
    Button,
    Box,
} from '@mui/material';

// MATERIAL ICONS
import {
    PersonAdd as AddIcon,
} from '@mui/icons-material'

const dummyUserData = [
    {
        email: 'sheridan@test.org',
        name: 'Sheridan Singleton',
        isAdmin: true,
    },
    {
        email: 'ben@test.org',
        name: 'Ben Davis',
        isAdmin: true,
    },
    {
        email: 'accountant@test.com',
        name: 'Accountant',
        isAdmin: false,
    },
];

const options = {
    manufacturer: ['Apple', 'PC'],
    status: ['UNPROCESSED', 'DONATED', 'READY', 'INTERNAL', 'RECYCLE', 'REINSTALL', 'SOLD'],
    donatedBy: ['BetterUP', 'OrderMyGear'],
    screenSize: ['12"', '13"', '15"', '16"'],
    memory: ['8 GB', '16 GB', '32 GB'],
    diskSize: ['128 GB', '256 GB', '512 GB', '1024 GB', '1 TB'],
    condition: ['A', 'B', 'C'],
};

function Settings() {
    const [users, setUsers] = useState();
    const [isAdmin, setIsAdmin] = useState(false)
    const currentUserEmail = 'sheridan@test.org';
    // Maybe we get the current user's email from session storage?

    useEffect(() => {
        if (!users) {
            // invoke get api call for usewr table
            console.log(`Getting users...`)
            setUsers(dummyUserData);
        }
    }, [users]);

    useEffect(() => {
        if (currentUserEmail && users) {
            setIsAdmin(users.find(user => user.email === currentUserEmail)?.isAdmin)
        }
    }, [currentUserEmail, users]);

    function revokeAdmin(email) {
        console.log(`Revoking admin status for ${email}...`);
        // Update user api call to flip admin status
    }

    function grantAdmin(email) {
        console.log(`Granting admin status for ${email}...`);
        // Update user api call to flip admin status
    }

    function removeUser(email) {
        console.log(`Removing ${email}...`);
        // Remove user api call
    }

    function resetPassword(email) {
        console.log(`Resetting password for ${email}...`);
        // Reset password
    }

    function addUser() {
        console.log(`Add user`);
        // Open modal to add user?
    }

    function addOption(newValue, category) {
        console.log(`Adding ${newValue} to the list of ${category} options...`)
    }

    function removeOption(value, category) {
        console.log(`Removing ${value} from the list of ${category} options...`)
    }

    return (
        <Container sx={{ maxWidth: '1220px', margin: '24px auto 24px;' }} >
            <Typography variant='h4' align='center' sx={{ color: 'primary.main', fontWeight: 'bold' }} gutterBottom >Settings</Typography>

            {isAdmin && <>
                <Typography variant='h6' sx={{ color: 'primary.dark', fontWeight: 'bold' }} gutterBottom >Manage Users</Typography>
                <Paper sx={{ p: 1 }} >
                    <TableContainer>
                        <Table size="small" >
                            <TableHead>
                                <TableRow sx={{ backgroundColor: 'primary' }} >
                                    <TableCell sx={{ fontWeight: 'bold' }} >User Name</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }} >Email</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }} >Access Level</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map(user => (
                                    <TableRow key={user.email} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell component='th' scope='row'>{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.isAdmin ? 'Admin' : 'User'}</TableCell>
                                        <TableCell>{user.isAdmin ?
                                            <Button disabled={user.email === currentUserEmail} fullWidth variant='outlined' color='warning' onClick={() => revokeAdmin(user.email)} >Revoke Admin Status</Button>
                                            :
                                            <Button disabled={user.email === currentUserEmail} fullWidth variant='outlined' color='secondary' onClick={() => grantAdmin(user.email)} >Grant Admin Status</Button>
                                        }</TableCell>
                                        <TableCell>
                                            <Button disabled={user.email === currentUserEmail} fullWidth variant='outlined' color='error' onClick={() => removeUser(user.email)} >Remove User</Button>
                                        </TableCell>
                                        <TableCell>
                                            <Button fullWidth variant='outlined' color='primary' onClick={() => resetPassword(user.email)} >Reset Password</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
                <Box sx={{ p: 1, mt: 1, mb: 2 }} >
                    <Button
                        variant='contained'
                        color='secondary'
                        endIcon={<AddIcon />}
                        onClick={addUser}
                    >Add New User</Button>
                </Box>
            </>}

            <Typography variant='h6' sx={{ color: 'primary.dark', fontWeight: 'bold' }} gutterBottom >Manage Dropdown Options</Typography>
            <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: 'repeat(5, 1fr)' }} >
                <DropdownManager
                    header='Status'
                    id='status'
                    options={options.status}
                    addOption={addOption}
                    removeOption={removeOption}
                />
                <DropdownManager
                    header='Disk Size'
                    id='diskSize'
                    options={options.diskSize}
                    addOption={addOption}
                    removeOption={removeOption}
                />
                <DropdownManager
                    header='Screen Size'
                    id='screenSize'
                    options={options.screenSize}
                    addOption={addOption}
                    removeOption={removeOption}
                />
                <DropdownManager
                    header='Memory'
                    id='memory'
                    options={options.memory}
                    addOption={addOption}
                    removeOption={removeOption}
                />
                <DropdownManager
                    header='Condition'
                    id='condition'
                    options={options.condition}
                    addOption={addOption}
                    removeOption={removeOption}
                />
                <DropdownManager
                    header='Manufacturer'
                    id='manufacturer'
                    options={options.manufacturer}
                    addOption={addOption}
                    removeOption={removeOption}
                />
                <DropdownManager
                    header='Donated By'
                    id='donatedBy'
                    options={options.donatedBy}
                    addOption={addOption}
                    removeOption={removeOption}
                />
            </Box>

        </Container>
    )
}
export default Settings;