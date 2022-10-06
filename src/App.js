import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import AppBarMenu from './components/AppBarMenu';
import AddLaptopPage from './pages/AddLaptopPage';
import EditLaptopPage from './pages/EditLaptopPage';
import Inventory from './pages/Inventory';
import Settings from './pages/Settings';
import Login from './pages/Login';

import './App.css';
import './react-app.css';
import Axios from 'axios';

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



  // const addLaptop = () => {
  //   Axios.post('http://localhost:3001/create', {
  //     //insert variables here
  //   }). then(() => {
  //     console.log("success");
  //     set laptop list can be done here with array destructuring
  //   });
  // };

  const getLaptops = () => {
    Axios.get('http://localhost:3001/laptops').then((response) => {
      console.log("success");
    });
  }

  return (
    <ThemeProvider theme={theme} >
      <div className="wrapper">
        <AppBarMenu />

        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/add' element={<AddLaptopPage />} />
            <Route path='/edit/:make/:serial' element={<EditLaptopPage />} />
            <Route path='/inventory' element={<Inventory />} />
            <Route path='/settings' element={<Settings />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
