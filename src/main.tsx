import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { DarkThemeProvider } from './shared/contexts/theme/DarkThemeContext';
import { AuthenticationStorage } from './shared/storage/authentication/AuthenticationStorage';
import { AuthenticationProvider } from './shared/contexts/authentication/AuthenticationContext';
import { OpenAPI } from './shared/services/openapi';

OpenAPI.BASE = import.meta.env.VITE_API_URL;
OpenAPI.TOKEN = async () => AuthenticationStorage.getJwtToken()!;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <DarkThemeProvider>
    <AuthenticationProvider>
      <App />
    </AuthenticationProvider>
  </DarkThemeProvider>
  // </React.StrictMode>
);

/*
 * TODO:
 *  - Save theme preference to localStorage
 *  - Add icon svg to menu bar + change color depending on theme
 *  - Add PWA functionality
 *  - Add error toasts
 * */

/*
 * Feedback:
 *  Remove account button when not logged in
 *  make api key password field (with stars)
 *  Filename: {artist} - {song title}, otherwise video title
 *  
 * */
