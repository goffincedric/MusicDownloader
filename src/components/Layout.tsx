import CssBaseline from '@mui/material/CssBaseline';
import TitleBar from '../containers/TitleBar';
import { ThemeProvider } from '@emotion/react';
import React, { PropsWithChildren, useContext } from 'react';
import { DarkThemeContext } from '../shared/contexts/theme/DarkThemeContext';
import { createTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import { StepsProvider } from '../shared/contexts/steps/StepsContext';
import { MusicProvider } from '../shared/contexts/music/MusicContext';

function Layout({ children }: PropsWithChildren) {
  // Theme logic
  const { themeOptions } = useContext(DarkThemeContext);
  const theme = React.useMemo(() => createTheme(themeOptions), [themeOptions]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TitleBar />
      <Box mt={10}>
        <StepsProvider>
          <MusicProvider>{children}</MusicProvider>
        </StepsProvider>
      </Box>
    </ThemeProvider>
  );
}

export default Layout;
