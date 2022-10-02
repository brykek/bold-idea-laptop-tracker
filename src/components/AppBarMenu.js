import React, { useState } from 'react';
import logo from '../assets/logo.png'

// MATERIAL-UI COMPONENTS
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
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

function AppBarMenu(props) {
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenUserMenu = (e) => setAnchorElUser(e.currentTarget);
    const handleCloseUserMenu = () => setAnchorElUser(null);
    const handlePasswordChange = () => {
        // Password change action here (trigger modal open?)
        setAnchorElUser(null);
    }
    const handleLogout = () => {
        // Logout action here
        setAnchorElUser(null);
    }

    return (
        <AppBar position='sticky'>
            <Toolbar>
                {/* LOGO & APP TITLE */}
                <div style={{ backgroundColor: '#ffffff', borderRadius: '10px', height: '72px', width: '72px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '12px 0' }} >
                    <img src={logo} style={{ height: '64px' }} />
                </div>
                <Typography variant='h5' component='div' sx={{ ml: 2, flexGrow: 1 }}>
                    Laptop Inventory Tracker
                </Typography>

                {/* NAVIGATION BUTTONS */}
                <Button
                    disabled={props.activePage === 'add'}
                    variant='outline'
                    startIcon={<AddIcon />}
                    onClick={() => props.setActivePage('add')}
                    sx={{ mr: 2 }}
                >
                    Add Laptop
                </Button>
                <Button
                    disabled={props.activePage === 'inventory'}
                    variant='outline'
                    startIcon={<InventoryIcon />}
                    onClick={() => props.setActivePage('inventory')}
                    sx={{ mr: 2 }}
                >
                    View Inventory
                </Button>
                <Button
                    disabled={props.activePage === 'settings'}
                    variant='outline'
                    startIcon={<SettingsIcon />}
                    onClick={() => props.setActivePage('settings')}
                    sx={{ mr: 2 }}
                >
                    Settings
                </Button>

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
            </Toolbar>
        </AppBar >
    );
}

export default AppBarMenu;