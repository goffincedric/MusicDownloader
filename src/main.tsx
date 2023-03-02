import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { OpenAPI } from './shared/services/openapi';
import { DarkThemeProvider } from './module-youtube/contexts/theme/DarkThemeContext';

OpenAPI.BASE = 'https://localhost:44392';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <DarkThemeProvider>
    <App />
  </DarkThemeProvider>
  // </React.StrictMode>
);
