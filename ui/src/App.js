import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, redirect } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import AppBarMenu from './components/AppBarMenu';
import AddLaptopPage from './pages/AddLaptopPage';
import EditLaptopPage from './pages/EditLaptopPage';
import InventoryPage from './pages/InventoryPage';
import SettingsPage from './pages/SettingsPage';
import Login from './pages/Login';
import Protected from './pages/ProtectedPage';
import Signup from './pages/Signup';

import { loggedIn } from './util/helpers';

import './App.css';
import './react-app.css';


function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#685c7f',
      },
      secondary: {
        main: '#3d9991',
      },
      error: {
        main: '#f44336',
      },
      success: {
        main: '#4caf50',
      },
      warning: {
        main: '#ff9800',
      },
      info: {
        main: '#2196f3',
      },
    },
  });

  return (
    <ThemeProvider theme={theme} >
      <div className="wrapper">
        <AppBarMenu />
        <BrowserRouter>
          <Routes>
            <Route path='/signup' element={<Signup />} />
            <Route path='/' element={<Login />} />
            <Route 
              path='/add'
              element={
                <Protected>
                  <AddLaptopPage />
                </Protected>
              } 
            />
            <Route 
              path='/edit/:id'
              element={
                <Protected>
                  <EditLaptopPage />
                </Protected>
              } 
            />
            <Route 
              path='/inventory'
              element={
                <Protected>
                  <InventoryPage />
                </Protected>
              }
            />
            <Route 
              path='/settings' 
              element={
                <Protected>
                  <SettingsPage />
                </Protected>
              } 
            />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
