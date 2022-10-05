import React from 'react';

// MATERIAL-UI COMPONENTS
import {
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
    Skeleton,
} from '@mui/material';

// MATERIAL ICONS
import {
    PersonAdd as AddIcon,
} from '@mui/icons-material'


function UserManager(props) {

    if (props.isAdmin === false) {
        return <></>;
    } else if (props.isAdmin === undefined) {
        return <>
            <Skeleton variant="text" sx={{ fontSize: '1.25rem' }} />
            <Skeleton variant="rectangular" width={1150} height={200} sx={{ mb: 1 }} />
            <Skeleton variant="rectangular" width={150} height={36} sx={{ mb: 1 }} />
        </>;
    }

    return <>
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
                        {props.users.map(user => (
                            <TableRow key={user.email} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component='th' scope='row'>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.isAdmin ? 'Admin' : 'User'}</TableCell>
                                <TableCell>{user.isAdmin ?
                                    <Button disabled={user.email === props.currentUserEmail} fullWidth variant='outlined' color='warning' onClick={() => props.revokeAdmin(user.email)} >Revoke Admin Status</Button>
                                    :
                                    <Button disabled={user.email === props.currentUserEmail} fullWidth variant='outlined' color='secondary' onClick={() => props.grantAdmin(user.email)} >Grant Admin Status</Button>
                                }</TableCell>
                                <TableCell>
                                    <Button disabled={user.email === props.currentUserEmail} fullWidth variant='outlined' color='error' onClick={() => props.removeUser(user.email)} >Remove User</Button>
                                </TableCell>
                                <TableCell>
                                    <Button fullWidth variant='outlined' color='primary' onClick={() => props.resetPassword(user.email)} >Reset Password</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
        <Box sx={{ pt: 1, pb: 1, mt: 1, mb: 2 }} >
            <Button
                variant='contained'
                color='secondary'
                endIcon={<AddIcon />}
                onClick={props.addUser}
            >Add New User</Button>
        </Box>
    </>;
}

export default UserManager;
