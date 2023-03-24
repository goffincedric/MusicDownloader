import Typography from '@mui/material/Typography';
import React, { useContext } from 'react';
import { StepsDispatchContext } from '../../shared/contexts/steps/StepsContext';
import { Box, Button, SxProps } from '@mui/material';
import { StepActionType } from '../../shared/contexts/steps/StepActions';
import { FavoriteBorder, MusicNote } from '@mui/icons-material';
import { MusicDispatchContext } from '../../shared/contexts/music/MusicContext';
import { TranslationConstants } from '../../shared/constants/translation.constants';
import { MusicActionType } from '../../shared/contexts/music/MusicActions';

export function StepsCompleted() {
  const dispatchStepAction = useContext(StepsDispatchContext);
  const dispatchMusicAction = useContext(MusicDispatchContext);
  const size = 100;
  const iconStyle: SxProps = {
    height: size,
    width: size,
  };

  const handleRestart = () => {
    dispatchStepAction({ type: StepActionType.RESET });
    dispatchMusicAction({ type: MusicActionType.RESET });
  };
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
        {TranslationConstants.LABELS.STEPS_COMPLETED_THANKS}
        {/* TODO: Donating message? */}
      </Typography>
      <Box sx={{ display: 'flex', mb: 2, color: 'hotpink' }}>
        <FavoriteBorder sx={iconStyle} />
        <MusicNote sx={iconStyle} />
      </Box>
      <Typography variant="body1" gutterBottom>
        {TranslationConstants.LABELS.STEPS_COMPLETED_RETRY}
      </Typography>
      <Button variant="contained" onClick={handleRestart} sx={{ my: 2 }}>
        {TranslationConstants.BUTTONS.DOWNLOAD_MORE}
      </Button>
    </Box>
  );
}
