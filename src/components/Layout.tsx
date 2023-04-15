import CssBaseline from '@mui/material/CssBaseline';
import TitleBar from '../containers/TitleBar';
import { ThemeProvider } from '@emotion/react';
import React, { PropsWithChildren, useContext } from 'react';
import { DarkThemeContext } from '../shared/contexts/theme/DarkThemeContext';
import { createTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import { StepsProvider } from '../shared/contexts/steps/StepsContext';
import { MusicProvider } from '../shared/contexts/music/MusicContext';
import { ThemeUtils } from '../shared/utils/theme.utils';

function Layout({ children }: PropsWithChildren) {
  // Theme logic
  const { currentMode } = useContext(DarkThemeContext);
  const theme = React.useMemo(() => createTheme(ThemeUtils.resolveTheme(currentMode)), [currentMode]);
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
