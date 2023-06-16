import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import {
    Container,
    Typography,
    Box,
    Modal,
    TextField,
    Button,
} from '@mui/material';
import { RemoveCircle as RemoveIcon } from '@mui/icons-material';

import UserManager from '../components/UserManager';
import DropdownManager from '../components/DropdownManager';
import DropdownManagement from '../components/DropdownManagement';
import { bearerTokenConfig } from '../util/helpers';
import roles from '../enums/roles';
import Error from '../enums/errors';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;


function SettingsPage() {
    const [users, setUsers] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false)
    const currentUserToken = Cookies.get('token');
    const [showRemoveUserModal, setShowRemoveUserModal] = useState(false);
    const [showAddUserModal, setShowAddUserModal] = useState(false);
    const [showGrantAdminModal, setShowGrantAdminModal] = useState(false);
    const [showRevokeAdminModal, setShowRevokeAdminModal] = useState(false);
    const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
    const [newUserData, setNewUserData] = useState({ firstName: '', lastName: '', username: '', password: '', role: roles.USER });
    const [targetUser, setTargetUser] = useState({ id: '', firstName: '', lastName: '', username: '', password: '', role: '' });
    const [message, setMessage] = useState('');
    const newUserTemplate = { id: '', firstName: '', lastName: '', username: '', password: '', role: roles.USER };

    useEffect(() => {
        if (currentUserToken) {
            var userToken = jwtDecode(currentUserToken);
            if (userToken.role === roles.ADMIN || userToken.role === roles.SUPERADMIN) { 
                setIsAdmin(true);
            }
        }
    }, [currentUserToken]);

    useEffect(() => {
        if (isAdmin && !users) {
            refreshUserList();
        }
    }, [users, isAdmin]);

    function refreshUserList() {
        axios.get(
            `${API_BASE_URL}/users`,
            bearerTokenConfig
        ).then((response) => {
            setUsers(response.data);
        }).catch((err) => {
            console.error(err);
        });
    }

    function grantAdminModal(user) {     
        setTargetUser(user);
        setShowGrantAdminModal(true);
    }

    function revokeAdminModal(user) {
        setTargetUser(user);
        setShowRevokeAdminModal(true);
    }

    function grantAdmin(targetUser) {
        targetUser.role = roles.ADMIN;
        axios.put(
            `${API_BASE_URL}/users/${targetUser.id}`,
            targetUser,
            bearerTokenConfig
        ).then(() => {
            refreshUserList();
        }).catch((err) => {
            console.error(err);
        });
        setShowGrantAdminModal(false);
    }

    function revokeAdmin(targetUser) {
        targetUser.role = roles.USER;
        axios.put(
            `${API_BASE_URL}/users/${targetUser.id}`,
            targetUser,
            bearerTokenConfig
        ).then(() => {
           refreshUserList();
        }).catch((err) => {
            console.error(err);
        });
        setShowRevokeAdminModal(false);
    }

    function addUserModal() {
        setShowAddUserModal(true);
    }

    function removeUserModal(user) {
        setTargetUser(user);
        setShowRemoveUserModal(true);   
    }

    function removeUser(targetUser) {
        axios.delete(
            `${API_BASE_URL}/users/${targetUser.id}`,
            bearerTokenConfig
        ).then(() => {
            refreshUserList();
        }).catch((err) => {
            console.error(err);
        });
        setShowRemoveUserModal(false);
    }

    function resetPasswordModal(user) {
        var updatedUser = {...user}
        updatedUser['password'] = '';
        setTargetUser(updatedUser);
        setShowResetPasswordModal(true);
    }

    function resetPassword(targetUser) {
        if (!targetUser.password.length > 0) { 
            setMessage(Error.EMPTY_FIELD);
            return;
        }
        axios.put(
            `${API_BASE_URL}/users/${targetUser.id}`,
            targetUser,
            bearerTokenConfig
        ).catch((err) => {
            console.error(err);
        });
        setShowResetPasswordModal(false);
    }

    function createUser() {
        if (!newUserData.username.length > 0 || !newUserData.password.length > 0 || !newUserData.firstName.length > 0 || !newUserData.lastName.length > 0) { 
            setMessage(Error.EMPTY_FIELD);
            return;
        }

        axios.post(
            `${API_BASE_URL}/signup`,
            newUserData,
            bearerTokenConfig
        ).then(() => {
            axios.get(
                `${API_BASE_URL}/users`,
                bearerTokenConfig
            ).then((response) => {
                setUsers(response.data);
                setMessage('');
                setNewUserData(newUserTemplate);
                setShowAddUserModal(false);
            }).catch((err) => {
                console.error(err);
            });
        }).catch((err) => {
            setMessage(Error.USER_EXISTS);
            console.error(err);
        });
    }

    function handleUserChange(value, field) {
        const updatedData = { ...newUserData };
        updatedData[field] = value;
        setNewUserData(updatedData);
    }

    function handlePasswordChange(newPassword) { 
        const updatedData = {...targetUser}
        updatedData['password'] = newPassword;
        setTargetUser(updatedData);
    }

    return <>
        <Container sx={{ maxWidth: '1220px', margin: '24px auto 24px;' }} >
            <Typography variant='h4' align='center' sx={{ color: 'primary.main', fontWeight: 'bold' }} gutterBottom >Settings</Typography>
            {isAdmin && 
                <UserManager
                    isAdmin={isAdmin}
                    users={users}
                    currentUserToken={currentUserToken}
                    revokeAdmin={revokeAdminModal}
                    grantAdmin={grantAdminModal}
                    removeUser={removeUserModal}
                    resetPassword={resetPasswordModal}
                    addUser={addUserModal}
                />
            }
            <DropdownManagement/>
        </Container>

        {/* Add User Modal */}
        <Modal open={showAddUserModal} onClose={() => setShowAddUserModal(false)} >
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 600, bgcolor: 'background.paper', borderRadius: '16px', boxShadow: 24, p: 4, alignContent: 'center', }} >
                <Typography align='center' variant='h7' component='h2' sx={{ color: 'primary.dark', fontWeight: 'bold', mb: 3 }} >
                    Create New User
                </Typography>
                <Box sx={{ display: 'grid', width: '300px', margin: '0 auto', gap: 1, gridTemplateColumns: 'repeat(1, 1fr)' }} >
                    <TextField
                        required
                        id='firstName-field'
                        value={newUserData.firstName}
                        label='First Name'
                        size='small'
                        onChange={(event) => handleUserChange(event.target.value, 'firstName')}
                    />
                    <TextField
                        required
                        id='lastName-field'
                        value={newUserData.lastName}
                        label='Last Name'
                        size='small'
                        onChange={(event) => handleUserChange(event.target.value, 'lastName')}
                    />
                    <TextField
                        required
                        id='username-field'
                        value={newUserData.username}
                        label='Email'
                        size='small'
                        onChange={(event) => handleUserChange(event.target.value, 'username')}
                    />
                    <TextField
                        required
                        id='password-field'
                        type='password'
                        autoComplete="new-password"
                        value={newUserData.password}
                        label='Temporary Password'
                        size='small'
                        onChange={(event) => handleUserChange(event.target.value, 'password')}
                    />
                </Box>

                <Box sx={{ m: 2, display: 'flex', flexDirection: 'row', gap: '16px', justifyContent: 'center' }} >
                    <Button
                        variant='text'
                        color='error'
                        onClick={() => {
                            setMessage('');
                            setNewUserData(newUserTemplate);
                            setShowAddUserModal(false);
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant='contained'
                        color='secondary'
                        onClick={createUser}
                    >Create User</Button>
                </Box>
                <Typography color='red' align='center'>{message}</Typography>
            </Box>
        </Modal>

        {/* Remove User Modal */}
        <Modal open={showRemoveUserModal} onClose={() => setShowRemoveUserModal(false)} >
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 600, bgcolor: 'background.paper', borderRadius: '16px', boxShadow: 24, p: 4, alignContent: 'center', }} >
                <Typography align='center' variant='h7' component='h2' sx={{ color: 'primary.dark', fontWeight: 'bold', mb: 3 }} >
                    Remove User Access for "{targetUser.username}"?
                </Typography>
                <Box sx={{ m: 2, display: 'flex', flexDirection: 'row', gap: '16px', justifyContent: 'center' }} >
                    <Button
                        variant='text'
                        color='secondary'
                        onClick={() => setShowRemoveUserModal(false)}
                    >Cancel</Button>
                    <Button
                        variant='contained'
                        color='error'
                        onClick={() => removeUser(targetUser)}
                        startIcon={<RemoveIcon />}
                    >Yes, Remove User Access</Button>
                </Box>
            </Box>
        </Modal>

        {/* Revoke Admin Modal */}
        <Modal open={showRevokeAdminModal} onClose={() => setShowRevokeAdminModal(false)} >
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 600, bgcolor: 'background.paper', borderRadius: '16px', boxShadow: 24, p: 4, alignContent: 'center', }} >
                <Typography align='center' variant='h7' component='h2' sx={{ color: 'primary.dark', fontWeight: 'bold', mb: 3 }} >
                    Remove admin access for "{targetUser.username}"?
                </Typography>
                <Box sx={{ m: 2, display: 'flex', flexDirection: 'row', gap: '16px', justifyContent: 'center' }} >
                    <Button
                        variant='text'
                        color='secondary'
                        onClick={() => setShowRevokeAdminModal(false)}
                    >Cancel</Button>
                    <Button
                        variant='contained'
                        color='error'
                        onClick={() => revokeAdmin(targetUser)}
                        startIcon={<RemoveIcon />}
                    >Yes, Revoke Admin Access</Button>
                </Box>
            </Box>
        </Modal>

        {/* Grant Admin Modal */}
        <Modal open={showGrantAdminModal} onClose={() => setShowGrantAdminModal(false)} >
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 600, bgcolor: 'background.paper', borderRadius: '16px', boxShadow: 24, p: 4, alignContent: 'center', }} >
                <Typography align='center' variant='h7' component='h2' sx={{ color: 'primary.dark', fontWeight: 'bold', mb: 3 }} >
                    Grant admin access for "{targetUser.username}"?
                </Typography>
                <Box sx={{ m: 2, display: 'flex', flexDirection: 'row', gap: '16px', justifyContent: 'center' }} >
                    <Button
                        variant='text'
                        color='error'
                        onClick={() => setShowGrantAdminModal(false)}
                    >Cancel</Button>
                    <Button
                        variant='contained'
                        color='secondary'
                        onClick={() => grantAdmin(targetUser)}
                    >Yes, Grant Admin Access</Button>
                </Box>
            </Box>
        </Modal>

        {/* Reset Password Modal */}
        <Modal open={showResetPasswordModal} onClose={() => setShowResetPasswordModal(false)} >
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 600, bgcolor: 'background.paper', borderRadius: '16px', boxShadow: 24, p: 4, alignContent: 'center', }} >
                <Typography align='center' variant='h7' component='h2' sx={{ color: 'primary.dark', fontWeight: 'bold', mb: 3 }} >
                    Reset password for "{targetUser.username}"?
                </Typography>
                <Box component="form"  sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                        required
                        id='password-field'
                        type='password'
                        autoComplete="new-password"
                        value={targetUser.password}
                        label='New password'
                        size='small'
                        onChange={(event) => handlePasswordChange(event.target.value)}
                    />      
                </Box>
                <Box sx={{ m: 2, display: 'flex', flexDirection: 'row', gap: '16px', justifyContent: 'center' }} >
                    <Button
                        variant='text'
                        color='error'
                        onClick={() => {
                            setMessage('');
                            setShowResetPasswordModal(false);
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={() => resetPassword(targetUser)}
                    >Reset Password</Button>
                </Box>
                <Typography color='red' align='center'>{message}</Typography>
            </Box>
        </Modal>
    </>;
}
export default SettingsPage;