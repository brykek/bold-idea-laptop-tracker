import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBarMenu from './components/AppBarMenu';
import LaptopForm from './components/LaptopForm';
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

  return (
    <ThemeProvider theme={theme} >
      <div className="App">
        <AppBarMenu activePage={activePage} setActivePage={setActivePage} />
        {activePage === 'add' &&
        // This implementation of the form is for testing - once the Add & Edit pages are assembled it will be called from those components!
          <div style={{ maxWidth: '1220px', margin: '24px auto 0' }} >
            <LaptopForm
              save={(object) => console.log(object)}
              saveMessage='Create Laptop'
              discard={() => console.log('discard')}
              discardMessage='Discard'
            />
          </div>
        }
      </div>
    </ThemeProvider>
  );
}

export default App;
