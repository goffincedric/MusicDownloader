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
 *  - Add icon svg to menu bar + change color depending on theme
 *  - Add PWA functionality
 *  - Add error toasts
 *  - Fix multiple music with same filename: showdown! https://www.youtube.com/playlist?list=PLEF1x2OQOdgwrnogZVJg4ciDK6QqMZDZs
 *    https://www.youtube.com/watch?v=Sgh_CoLkQt4&list=PLEF1x2OQOdgwrnogZVJg4ciDK6QqMZDZs&index=24
 *    https://www.youtube.com/watch?v=Sgh_CoLkQt4&list=PLEF1x2OQOdgwrnogZVJg4ciDK6QqMZDZs&index=31
 *  - Add Youtube Music support (same video id)
 * */

/*
 * Feedback:
 *  On Processing page, add warning popup when:
 *   - Some downloads failed
 *  On Download page, add warning popup when:
 *   - Clicking on Download more or next when no music has been downloaded yet
 *  Filename: {artist} - {song title}, otherwise video title
 *  Support for browser navigation (separate step page routes)
 *  Add countdown besides progress bar
 *  Add 'Powered by YoutubeReExplode' text to website somewhere
 *  Speed-mode: Keep url bar up, each url gets added to queue and auto-downloaded, per-url containers choice, only authorized for my use
 *  Podcast-mode: Don't use music metadata, use video titles, only playlist urls
 * */
