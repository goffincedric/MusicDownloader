import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import { MouseEvent, useState } from 'react';
import { MusicNote, Settings } from '@mui/icons-material';
import { DarkThemeButtons } from '../shared/components/DarkThemeButtons';
import { Divider, Paper, Stack, SwipeableDrawer, useTheme } from '@mui/material';

const pages = ['Products', 'Pricing', 'Blog'];

function TitleBar() {
  const [isDrawerOpen, toggleDrawer] = useState(false);

  return (
    <AppBar
      position="fixed"
      sx={{
        backdropFilter: 'blur(8px)',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <MusicNote sx={{ display: 'flex', mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              display: 'flex',
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            MUSIC DOWNLOADER
          </Typography>
          <Stack>
            <IconButton onClick={() => toggleDrawer(true)}>
              <Settings />
            </IconButton>
          </Stack>
          <SwipeableDrawer
            anchor="right"
            open={isDrawerOpen}
            onClose={() => toggleDrawer(false)}
            onOpen={() => toggleDrawer(true)}
          >
            <Container sx={{ p: 1, my: 3 }}>
              <Typography>Settings</Typography>
            </Container>
            <Divider />
            <Container sx={{ p: 1, my: 3 }}>
              <Typography color="palette.gray.600" gutterBottom>Theme settings</Typography>
              <DarkThemeButtons />
            </Container>
          </SwipeableDrawer>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default TitleBar;
