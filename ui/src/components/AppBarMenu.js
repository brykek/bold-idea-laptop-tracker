import React, { useState} from 'react';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import {
    Box,
    AppBar,
    Toolbar,
    Typography,
    Button,
    Avatar,
    Menu,
    MenuItem,
    Modal,
    TextField
} from '@mui/material';
import {
    Add as AddIcon,
    ViewList as InventoryIcon,
    Settings as SettingsIcon,
    Logout as LogoutIcon,
} from '@mui/icons-material';

import Error from '../enums/errors';
import { bearerTokenConfig, ProtectedComponent } from '../util/helpers';
import logo from '../assets/logo.png';


function AppBarMenu() {
    const [anchorElUser, setAnchorElUser] = useState(false);  
    const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
    const handleOpenUserMenu = (e) => setAnchorElUser(e.currentTarget);
    const handleCloseUserMenu = () => setAnchorElUser(false);
    const page = window.location.pathname.split('/')[1];
    const [targetUser, setTargetUser] = useState({ id: '', firstName: '', lastName: '', username: '', password: '', role: '' });
    const [message, setMessage] = useState('');
    const currentUserToken = Cookies.get('token');
    
    const handlePasswordChangeSelection = () => {
        setShowResetPasswordModal(true);
        setAnchorElUser(false);
    };

    function handlePasswordChange(newPassword) { 
        const updatedData = {...targetUser}
        updatedData['password'] = newPassword;
        setTargetUser(updatedData);
    }

    function resetPassword(targetUser) {
        var currentUserId = jwtDecode(currentUserToken).id;

        if (!targetUser.password.length > 0) { 
            setMessage(Error.EMPTY_FIELD);
            return;
        }

        axios.put(
            `http://localhost:3001/users/${currentUserId}`,
            targetUser,
            bearerTokenConfig
        ).then(() => {
            setMessage('');
            setTargetUser({ id: '', firstName: '', lastName: '', username: '', password: '', role: '' });
        }).catch((err) => {
            console.error(err);
        });
        setShowResetPasswordModal(false);
    }
    
    const handleLogout = () => {
        Cookies.remove('token');
        setAnchorElUser(false);
        window.location.reload(false);
    };

    return <>
        <AppBar position='sticky'>
            <Toolbar>
                {/* LOGO & APP TITLE */}
                <Box sx={{ backgroundColor: 'rgba(255,255,255, 0.5)', borderRadius: '10px', height: '50px', width: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '12px 0' }} >
                    <img src={logo} alt='logo' style={{ height: '42px' }} />
                </Box>

                <Typography variant='h5' component='div' sx={{ ml: 2, flexGrow: 1 }}>
                    Laptop Inventory Tracker
                </Typography>

                <ProtectedComponent>
                    {/* NAVIGATION BUTTONS */}
                    <Box sx={page === 'add' ? { borderBottom: '1px solid #EA9722', mr: 2 } : { mr: 2 }}>
                        <Button
                            disabled={page === 'add'}
                            variant='outline'
                            startIcon={<AddIcon />}
                            href='/add'
                        >
                            Add Laptop
                        </Button>
                    </Box>
                    
                    <Box sx={page === 'inventory' ? { borderBottom: '1px solid #EA9722', mr: 2 } : { mr: 2 }}>
                        <Button
                            disabled={page === 'inventory'}
                            variant='outline'
                            startIcon={<InventoryIcon />}
                            href='/inventory'
                        >
                            View Inventory
                        </Button>
                    </Box>
                    
                    <Box sx={page === 'settings' ? { borderBottom: '1px solid #EA9722', mr: 2 } : { mr: 2 }}>
                        <Button
                            disabled={page === 'settings'}
                            variant='outline'
                            startIcon={<SettingsIcon />}
                            href='/settings'
                        >
                            Settings
                        </Button>
                    </Box>

                    {/* AVATAR & MENU DROPDOWN */}
                    <Box sx={{ flexGrow: 0 }}>
                        <Avatar onClick={handleOpenUserMenu} style={{ cursor: 'pointer' }} />
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={anchorElUser}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem>
                                <Button onClick={handlePasswordChangeSelection} >Change Password</Button>
                            </MenuItem>
                            <MenuItem>
                                <Button onClick={handleLogout} startIcon={<LogoutIcon />}>Logout</Button>
                            </MenuItem>
                        </Menu>
                    </Box>
                </ProtectedComponent>
            </Toolbar>
        </AppBar >

        {/* Password Reset Modal  */}
        <Modal open={showResetPasswordModal} onClose={() => setShowResetPasswordModal(false)} >
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 600, bgcolor: 'background.paper', borderRadius: '16px', boxShadow: 24, p: 4, alignContent: 'center', }} >
                <Typography align='center' variant='h7' component='h2' sx={{ color: 'primary.dark', fontWeight: 'bold', mb: 3 }} >
                    Reset password?
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
    </>
};

export default AppBarMenu;
