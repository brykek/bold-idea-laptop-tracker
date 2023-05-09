import React, { useEffect, useState } from 'react';
import UserManager from '../components/UserManager';
import DropdownManager from '../components/DropdownManager';
import DropdownManagement from '../components/DropdownManagement';

// MATERIAL-UI COMPONENTS
import {
    Container,
    Typography,
    Box,
    Modal,
    TextField,
    Button,
} from '@mui/material';

// MATERIAL ICONS
import {
    RemoveCircle as RemoveIcon,
} from '@mui/icons-material';

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

function SettingsPage() {
    const [users, setUsers] = useState(dummyUserData);
    const [isAdmin, setIsAdmin] = useState(false)
    const currentUserEmail = 'sheridan@test.org'; // get the current user's email from session storage
    const [showRemoveUserModal, setShowRemoveUserModal] = useState(false);
    const [showAddUserModal, setShowAddUserModal] = useState(false);
    const [showGrantAdminModal, setShowGrantAdminModal] = useState(false);
    const [showRevokeAdminModal, setShowRevokeAdminModal] = useState(false);
    const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
    const [newUserData, setNewUserData] = useState({ name: '', email: '', password: '', isAdmin: false, });
    const [targetUser, setTargetUser] = useState({ name: '', email: '', password: '', isAdmin: false, });

    useEffect(() => {
        if (!users) {
            // invoke get api call for user table
            console.log(`Getting users...`)
            setUsers(dummyUserData);
        }
    }, [users]);

    useEffect(() => {
        if (currentUserEmail && users) {
            setIsAdmin(users.find(user => user.email === currentUserEmail)?.isAdmin)
        }
    }, [currentUserEmail, users]);

    function revokeAdminModal(email) {
        setShowRevokeAdminModal(true);
        setTargetUser(users.find(user => user.email === email));
    }

    function revokeAdmin(email) {
        setShowRevokeAdminModal(false);
        console.log(`Revoking admin status for ${email}...`);
        // Update user api call to flip admin status
    }

    function grantAdminModal(email) {
        setShowGrantAdminModal(true);
        setTargetUser(users.find(user => user.email === email));
    }

    function grantAdmin(email) {
        setShowGrantAdminModal(false);
        console.log(`Granting admin status for ${email}...`);
        // Update user api call to flip admin status
    }

    function removeUserModal(email) {
        setShowRemoveUserModal(true);
        setTargetUser(users.find(user => user.email === email));
    }

    function removeUser(email) {
        let updatedUserList = [...users];
        updatedUserList = updatedUserList.filter(user => user.email !== email);
        setUsers(updatedUserList);
        setShowRemoveUserModal(false);
        console.log(`Removing ${email}...`);
        // Remove user api call
    }

    function resetPasswordModal(email) {
        setShowResetPasswordModal(true);
        setTargetUser(users.find(user => user.email === email));
    }

    function resetPassword(email) {
        console.log(`Resetting password for ${email}...`);
        // Reset password
        setShowResetPasswordModal(false);
    }

    function addUserModal() {
        setShowAddUserModal(true);
    }

    function createUser() {
        const updatedUserList = [...users];
        updatedUserList.push(newUserData);
        setUsers(updatedUserList);
        // Make api call to add user
        setShowAddUserModal(false);
    }

    function handleUserChange(value, field) {
        const updatedData = { ...newUserData };
        updatedData[field] = value;
        setNewUserData(updatedData);
    }

    return <>
        <Container sx={{ maxWidth: '1220px', margin: '24px auto 24px;' }} >
            <Typography variant='h4' align='center' sx={{ color: 'primary.main', fontWeight: 'bold' }} gutterBottom >Settings</Typography>

            <UserManager
                isAdmin={isAdmin}
                users={users}
                currentUserEmail={currentUserEmail}
                revokeAdmin={revokeAdminModal}
                grantAdmin={grantAdminModal}
                removeUser={removeUserModal}
                resetPassword={resetPasswordModal}
                addUser={addUserModal}
            />
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
                        id='name-field'
                        value={newUserData.name}
                        label='Name'
                        size='small'
                        onChange={(event) => handleUserChange(event.target.value, 'name')}
                    />
                    <TextField
                        required
                        id='email-field'
                        value={newUserData.email}
                        label='Email'
                        size='small'
                        onChange={(event) => handleUserChange(event.target.value, 'email')}
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
                        onClick={() => setShowAddUserModal(false)}
                    >Cancel</Button>
                    <Button
                        variant='contained'
                        color='secondary'
                        onClick={createUser}
                    >Create User</Button>
                </Box>
            </Box>
        </Modal>

        {/* Remove User Modal */}
        <Modal open={showRemoveUserModal} onClose={() => setShowRemoveUserModal(false)} >
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 600, bgcolor: 'background.paper', borderRadius: '16px', boxShadow: 24, p: 4, alignContent: 'center', }} >
                <Typography align='center' variant='h7' component='h2' sx={{ color: 'primary.dark', fontWeight: 'bold', mb: 3 }} >
                    Remove User Access for "{targetUser.name}"?
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
                        onClick={() => removeUser(targetUser.email)}
                        startIcon={<RemoveIcon />}
                    >Yes, Remove User Access</Button>
                </Box>
            </Box>
        </Modal>

        {/* Revoke Admin Modal */}
        <Modal open={showRevokeAdminModal} onClose={() => setShowRevokeAdminModal(false)} >
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 600, bgcolor: 'background.paper', borderRadius: '16px', boxShadow: 24, p: 4, alignContent: 'center', }} >
                <Typography align='center' variant='h7' component='h2' sx={{ color: 'primary.dark', fontWeight: 'bold', mb: 3 }} >
                    Remove admin access for "{targetUser.name}"?
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
                        onClick={() => revokeAdmin(targetUser.email)}
                        startIcon={<RemoveIcon />}
                    >Yes, Revoke Admin Access</Button>
                </Box>
            </Box>
        </Modal>

        {/* Grant Admin Modal */}
        <Modal open={showGrantAdminModal} onClose={() => setShowGrantAdminModal(false)} >
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 600, bgcolor: 'background.paper', borderRadius: '16px', boxShadow: 24, p: 4, alignContent: 'center', }} >
                <Typography align='center' variant='h7' component='h2' sx={{ color: 'primary.dark', fontWeight: 'bold', mb: 3 }} >
                    Grant admin access for "{targetUser.name}"?
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
                        onClick={() => grantAdmin(targetUser.email)}
                    >Yes, Grant Admin Access</Button>
                </Box>
            </Box>
        </Modal>

        {/* Reset Password Modal */}
        <Modal open={showResetPasswordModal} onClose={() => setShowResetPasswordModal(false)} >
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 600, bgcolor: 'background.paper', borderRadius: '16px', boxShadow: 24, p: 4, alignContent: 'center', }} >
                <Typography align='center' variant='h7' component='h2' sx={{ color: 'primary.dark', fontWeight: 'bold', mb: 3 }} >
                    Reset password for "{targetUser.name}"?
                </Typography>
                <Box sx={{ m: 2, display: 'flex', flexDirection: 'row', gap: '16px', justifyContent: 'center' }} >
                    <Button
                        variant='text'
                        color='error'
                        onClick={() => setShowResetPasswordModal(false)}
                    >Cancel</Button>
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={() => resetPassword(targetUser.email)}
                    >Reset Password</Button>
                </Box>
            </Box>
        </Modal>
    </>;
}
export default SettingsPage;