import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './App.css';
import Form from './components/Form';
import Inventory from './components/Inventory';
import Settings from './components/Settings';
import Login from './components/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


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
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/form' element={<Form/>} />
        <Route path='/inventory' element={<Inventory/>} />
        <Route path='/settings' element={<Settings/>} />
        </Routes>
      </BrowserRouter>
    </div>
    </ThemeProvider>
  );
}

export default App;
