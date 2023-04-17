import React, { Fragment, useContext, useMemo, useRef, useState } from 'react';
import Typography from '@mui/material/Typography';
import { TranslationConstants } from '../../../shared/constants/translation.constants';
import { Box, Button, Divider, Stack } from '@mui/material';
import { MusicContext, MusicDispatchContext } from '../../../shared/contexts/music/MusicContext';
import TrackDownloadList from '../lists/TrackDownloadList';
import { DownloadStatusEnum } from '../../../shared/enums/downloadStatusEnum';
import TracksBulkDownload from '../lists/TracksBulkDownload';
import NavigationButtons from '../../../shared/components/button/NavigationButtons';
import { StepActionType } from '../../../shared/contexts/steps/StepActions';
import { StepsDispatchContext } from '../../../shared/contexts/steps/StepsContext';
import { MusicActionType } from '../../../shared/contexts/music/MusicActions';
import { NoTracksDownloadedDialog } from '../dialogs/NoTracksDownloadedDialog';

export default function DownloadStep() {
  const { tracks: _tracks } = useContext(MusicContext);
  const dispatchStepAction = useContext(StepsDispatchContext);
  const dispatchMusicAction = useContext(MusicDispatchContext);
  const downloadableTracks = useMemo(
    () => _tracks.filter((track) => track.selected && track.downloadStatus === DownloadStatusEnum.FINISHED),
    _tracks
  );

  // Dialog state
  const [dialogIsOpen, openDialog] = useState(false);
  // Callback state
  const successCallbackRef = useRef<Function>();

  // Download state
  const anyTrackGotLocallyDownloaded = useMemo(
    () => _tracks.some((track) => track.downloadedLocally && track.selected),
    [_tracks]
  );

  const validateLocalDownload = (onSuccessCallback: () => void) => {
    if (!anyTrackGotLocallyDownloaded) {
      openDialog(true);
      successCallbackRef.current = onSuccessCallback;
    }
    else onSuccessCallback();
  };
  const handleRestart = () => {
    dispatchStepAction({ type: StepActionType.RESET });
    dispatchMusicAction({ type: MusicActionType.RESET });
  };
  const handleNext = () => dispatchStepAction({ type: StepActionType.PROGRESS });

  return (
    <Fragment>
      <Typography variant="h6" gutterBottom>
        {TranslationConstants.LABELS.DOWNLOAD_STEP_TITLE}
      </Typography>
      {downloadableTracks.length > 1 && (
        <Fragment>
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}
          >
            <TracksBulkDownload tracks={downloadableTracks} />
            <NavigationButtons
              showBackButton={false}
              onNext={() => validateLocalDownload(handleNext)}
              canProgress
              gutterBottom
            />
          </Box>
          <Divider />
        </Fragment>
      )}
      <TrackDownloadList
        title={TranslationConstants.LABELS.DOWNLOADED_TRACKS}
        tracks={downloadableTracks}
        emptyListMessage={TranslationConstants.LABELS.NO_DOWNLOADABLE_TRACKS}
      />
      <Stack justifyContent="flex-end" direction="row">
        <Button variant="contained" onClick={() => validateLocalDownload(handleRestart)} sx={{ mb: 2, mt: 3 }}>
          {TranslationConstants.BUTTONS.DOWNLOAD_MORE}
        </Button>
        <NavigationButtons
          showBackButton={false}
          onNext={() => validateLocalDownload(handleNext)}
          nextButtonText={TranslationConstants.BUTTONS.FINISH}
          canProgress
          gutterTop
        />
      </Stack>
      <NoTracksDownloadedDialog isOpen={dialogIsOpen} onCancel={() => openDialog(false)} onContinue={() => successCallbackRef.current?.()} />
    </Fragment>
  );
}
