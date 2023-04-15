import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { MusicNote } from '@mui/icons-material';
import { Stack } from '@mui/material';
import { AccountButton } from '../components/menu/AccountButton';
import { SettingsButton } from '../components/menu/SettingsButton';
import { TranslationConstants } from '../shared/constants/translation.constants';
import { router } from '../router/router';
import { useContext } from 'react';
import { AuthenticationContext } from '../shared/contexts/authentication/AuthenticationContext';

function TitleBar() {
  const { authenticated } = useContext(AuthenticationContext);
  return (
    <AppBar
      position="fixed"
      sx={{
        backdropFilter: 'blur(8px)',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h5"
            noWrap
            sx={{
              display: 'flex',
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
              alignItems: 'center',
              userSelect: 'none',
              cursor: 'pointer',
            }}
            onClick={() => router.navigate('/')}
          >
            <MusicNote sx={{ display: 'flex', mr: 1 }} />
            {TranslationConstants.GENERAL.APP_TITLE}
          </Typography>
          <Stack direction="row" gap={2}>
            {authenticated && <AccountButton />}
            <SettingsButton />
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default TitleBar;
