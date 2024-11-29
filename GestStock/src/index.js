import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import 'core-js';

import App from './App';
import store from './store';

// Créez un thème personnalisé
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Couleur primaire personnalisée
    },
    secondary: {
      main: '#dc004e', // Couleur secondaire personnalisée
    },
    default: {
      main: '#757575', // Couleur par défaut personnalisée
    },
  },
});

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>
);
