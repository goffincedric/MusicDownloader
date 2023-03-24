import React, { Fragment, useContext, useMemo } from 'react';
import Typography from '@mui/material/Typography';
import { TranslationConstants } from '../../../shared/constants/translation.constants';
import { Box, Divider } from '@mui/material';
import { MusicContext } from '../../../shared/contexts/music/MusicContext';
import TrackDownloadList from '../lists/TrackDownloadList';
import { DownloadStatusEnum } from '../../../shared/enums/downloadStatusEnum';
import TracksBulkDownload from '../lists/TracksBulkDownload';
import NavigationButtons from '../../../shared/components/NavigationButtons';
import { StepActionType } from '../../../shared/contexts/steps/StepActions';
import { StepsDispatchContext } from '../../../shared/contexts/steps/StepsContext';

export default function DownloadStep() {
  const { tracks: _tracks } = useContext(MusicContext);
  const dispatchStepAction = useContext(StepsDispatchContext);
  const downloadableTracks = useMemo(
    () => _tracks.filter((track) => track.selected && track.downloadStatus === DownloadStatusEnum.FINISHED),
    _tracks
  );

  const onNext = () => dispatchStepAction({ type: StepActionType.PROGRESS });

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
            <NavigationButtons showBackButton={false} onNext={onNext} canProgress gutterBottom />
          </Box>
          <Divider />
        </Fragment>
      )}
      <TrackDownloadList
        title={TranslationConstants.LABELS.DOWNLOADED_TRACKS}
        tracks={downloadableTracks}
        emptyListMessage={TranslationConstants.LABELS.NO_DOWNLOADABLE_TRACKS}
      />
      <NavigationButtons showBackButton={false} onNext={onNext} canProgress gutterTop />
    </Fragment>
  );
}
