import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { loggedIn, ProtectedComponent } from '../util/helpers';
import logo from '../assets/logo.png';

// MATERIAL-UI COMPONENTS
import {
    Box,
    AppBar,
    Toolbar,
    Typography,
    Button,
    Avatar,
    Menu,
    MenuItem,
} from '@mui/material';

// MATERIAL ICONS
import {
    Add as AddIcon,
    ViewList as InventoryIcon,
    Settings as SettingsIcon,
    Logout as LogoutIcon,
} from '@mui/icons-material'

function AppBarMenu() {
    const [anchorElUser, setAnchorElUser] = useState(false);  
    const handleOpenUserMenu = (e) => setAnchorElUser(e.currentTarget);
    const handleCloseUserMenu = () => setAnchorElUser(false);
    const page = window.location.pathname.split('/')[1];
    
    const handlePasswordChange = () => {
        // Password change action here (trigger modal open?)
        setAnchorElUser(false);
    };
    
    const handleLogout = () => {
        Cookies.remove('token');
        sessionStorage.removeItem('user');
        sessionStorage.clear(); 
        setAnchorElUser(false);
        window.location.reload(false);
    };

    return (
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
                                <Button onClick={handlePasswordChange} >Change Password</Button>
                            </MenuItem>
                            <MenuItem>
                                <Button onClick={handleLogout} startIcon={<LogoutIcon />}>Logout</Button>
                            </MenuItem>
                        </Menu>
                    </Box>
                </ProtectedComponent>
            </Toolbar>
        </AppBar >
    );
};

export default AppBarMenu;