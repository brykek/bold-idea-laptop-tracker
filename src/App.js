import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBarMenu from './components/AppBarMenu';
import AddLaptopPage from './components/AddLaptopPage';
import EditLaptopPage from './components/EditLaptopPage';
import './react-app.css';


function App() {
  // This active page stuff is very light routing - Bryan's work may overwrite this, but now it shows the functional toolbar
  const [activePage, setActivePage] = useState('inventory');
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

  const dummyDataLaptop = {
    archived_date: "",
    charger_included: true,
    charger_type: "87W USB-C",
    condition: "A",
    cpu_type: "2.6GHz i7",
    created_date: "2022-09-30",
    date_donated: "2022-03-08",
    disk_size: "256 GB",
    donor: "OrderMyGear",
    laptop_id: "L6Q3",
    last_updated: "2022-10-01",
    list_price: "",
    manufacturer: "Apple",
    memory: "16 GB",
    model: "MacBook Pro",
    notes: "",
    screen_size: "15\"",
    serial_number: "C02YL6Q3LVCF",
    sold_price: "",
    status: "READY",
    trade_in_value: "800.00",
  }

  return (
    <ThemeProvider theme={theme} >
      <div className="App">
        <AppBarMenu activePage={activePage} setActivePage={setActivePage} />

        {/* This is dummy routing for testing - once the router is added Add Laptop will be called there, and once Inventory page/laptop modal exist Edit will be called there! */}
        {activePage === 'add' && <AddLaptopPage />}
        {activePage === 'settings' && <EditLaptopPage laptopData={dummyDataLaptop} />}
      </div>
    </ThemeProvider>
  );
}

export default App;
