import './App.scss';
import React, { useContext } from 'react';
import YoutubeSteps from './module-youtube/components/YoutubeSteps';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TitleBar from './components/TitleBar';
import { StepsProvider } from './module-youtube/contexts/steps/StepsContext';
import { MusicProvider } from './module-youtube/contexts/music/MusicContext';
import { PaletteMode, useMediaQuery } from '@mui/material';
import {
  DarkThemeContext,
  DarkThemeProvider,
} from './module-youtube/contexts/theme/DarkThemeContext';
import { DarkThemeMode } from './shared/enums/darkThemeModeEnum';

function App() {
  // Dark theme logic
  const { currentMode } = useContext(DarkThemeContext);
  let mode: PaletteMode;
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  if (currentMode !== DarkThemeMode.NATIVE) mode = currentMode;
  else if (prefersDarkMode) mode = 'dark';
  else mode = 'light';

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: { mode },
      }),
    [currentMode, prefersDarkMode]
  );
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TitleBar />
      <StepsProvider>
        <MusicProvider>
          <YoutubeSteps />
        </MusicProvider>
      </StepsProvider>
    </ThemeProvider>
  );
}

export default App;
