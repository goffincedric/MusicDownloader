import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { OpenAPI } from './shared/services/openapi';
import { DarkThemeProvider } from './shared/contexts/theme/DarkThemeContext';
import { ThemeConstants } from './shared/constants/theme.constants';
import { useMediaQuery } from '@mui/material';

OpenAPI.BASE = import.meta.env.VITE_API_URL;
console.log(OpenAPI.BASE);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <DarkThemeProvider>
    <App />
  </DarkThemeProvider>
  // </React.StrictMode>
);
