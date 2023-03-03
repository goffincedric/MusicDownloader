import './App.scss';
import React, { useContext } from 'react';
import YoutubeSteps from './module-youtube/components/YoutubeSteps';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TitleBar from './components/TitleBar';
import { StepsProvider } from './module-youtube/contexts/steps/StepsContext';
import { MusicProvider } from './module-youtube/contexts/music/MusicContext';
import { DarkThemeContext } from './module-youtube/contexts/theme/DarkThemeContext';
import { Box } from '@mui/material';

function App() {
  // Theme logic
  const { themeOptions } = useContext(DarkThemeContext);
  const theme = React.useMemo(() => createTheme(themeOptions), [themeOptions]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TitleBar />
      <Box mt={10}>
        <StepsProvider>
          <MusicProvider>
            <YoutubeSteps />
          </MusicProvider>
        </StepsProvider>
      </Box>
    </ThemeProvider>
  );
}

export default App;
