import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Form from './components/Form';
import Menu from './components/Menu';
import './App.css';


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
      <div className="App">
        <Menu />
        <Form />

      </div>
    </ThemeProvider>
  );
}

export default App;
