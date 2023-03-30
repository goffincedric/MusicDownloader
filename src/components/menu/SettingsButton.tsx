import { Fragment, useState } from 'react';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { Settings } from '@mui/icons-material';
import { Divider, SwipeableDrawer } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { DarkThemeButtons } from '../../shared/components/button/DarkThemeButtons';

export function SettingsButton() {
  const [isDrawerOpen, toggleDrawer] = useState(false);
  return (
    <Fragment>
      <IconButton onClick={() => toggleDrawer(true)}>
        <Settings />
      </IconButton>
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
          <Typography color="palette.gray.600" gutterBottom>
            Theme settings
          </Typography>
          <DarkThemeButtons />
        </Container>
      </SwipeableDrawer>
    </Fragment>
  );
}
