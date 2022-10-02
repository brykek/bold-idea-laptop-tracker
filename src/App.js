import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBarMenu from './components/AppBarMenu';
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
      </div>
    </ThemeProvider>
  );
}

export default App;
