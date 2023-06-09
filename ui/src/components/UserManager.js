import React from 'react';
import jwtDecode from 'jwt-decode';
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
import { PersonAdd as AddIcon } from '@mui/icons-material'

import roles from '../enums/roles';


function UserManager(props) {
    const currentUser = jwtDecode(props.currentUserToken);

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
                            <TableCell sx={{ fontWeight: 'bold' }} >Name</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }} >Email</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }} >Access Level</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.users && props.users.map(user => (
                            <TableRow key={user.username} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component='th' scope='row'>{`${user.firstName} ${user.lastName}`}</TableCell>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.role.toUpperCase()}</TableCell>
                                <TableCell>{(user.role === roles.SUPERADMIN || user.role === roles.ADMIN) ?
                                    <Button disabled={user.id === currentUser.id || user.role === roles.SUPERADMIN} fullWidth variant='outlined' color='warning' onClick={() => props.revokeAdmin(user)} >Revoke Admin Status</Button>
                                    :
                                    <Button disabled={user.id === currentUser.id} fullWidth variant='outlined' color='secondary' onClick={() => props.grantAdmin(user)} >Grant Admin Status</Button>
                                }</TableCell>
                                <TableCell>          
                                    <Button disabled={user.id === currentUser.id || user.role === roles.SUPERADMIN} fullWidth variant='outlined' color='error' onClick={() => props.removeUser(user)} >Remove User</Button>
                                </TableCell>
                                <TableCell>
                                    <Button fullWidth variant='outlined' color='primary' onClick={() => props.resetPassword(user)} >Reset Password</Button>
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
