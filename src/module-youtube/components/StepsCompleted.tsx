import Typography from '@mui/material/Typography';
import React, { useContext } from 'react';
import { StepsDispatchContext } from '../contexts/steps/StepsContext';
import { Box, Button, SxProps } from '@mui/material';
import { StepActionType } from '../contexts/steps/StepActions';
import { FavoriteBorder, MusicNote } from '@mui/icons-material';
import { MusicDispatchContext } from '../contexts/music/MusicContext';

export function StepsCompleted() {
  const dispatchStepAction = useContext(StepsDispatchContext);
  const dispatchMusicAction = useContext(MusicDispatchContext);
  const size = 100;
  const iconStyle: SxProps = {
    height: size,
    width: size,
  };

  const handleRestart = () =>
    dispatchStepAction({ type: StepActionType.RESET, dispatchMusicAction });
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2,
      }}
    >
      <Typography variant="h3" gutterBottom>
        Thanks for using our website!
        {/* TODO: Donating message? */}
      </Typography>
      <Box sx={{ display: 'flex', mb: 2, color: 'hotpink' }}>
        <FavoriteBorder sx={iconStyle} />
        <MusicNote sx={iconStyle} />
      </Box>
      <Typography variant="body1" gutterBottom>
        Want to download another video/playlist? Click the button below to start
        over!
      </Typography>
      <Button variant="contained" onClick={handleRestart} sx={{ my: 2 }}>
        Download more
      </Button>
    </Box>
  );
}
