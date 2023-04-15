import { Fragment, useContext, useMemo } from 'react';
import { MusicContext, MusicDispatchContext } from '../../../shared/contexts/music/MusicContext';
import { DownloadStatusEnum } from '../../../shared/enums/downloadStatusEnum';
import { Button, Divider, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import { TranslationConstants } from '../../../shared/constants/translation.constants';
import Box from '@mui/material/Box';
import { Track } from '../../../shared/models/track';
import LinearProgressWithLabel from '../../../shared/components/progress/LinearProgressWithLabel';
import { Check, Settings } from '@mui/icons-material';
import { StepsDispatchContext } from '../../../shared/contexts/steps/StepsContext';
import { StepActionType } from '../../../shared/contexts/steps/StepActions';
import { GlobalConstants } from '../../../shared/constants/global.constants';
import LoadingButtonCustomIcon from '../../../shared/components/button/LoadingButtonCustomIcon';
import TrackProcessingList from '../../containers/TrackProcessingList';
import NavigationButtons from '../../../shared/components/button/NavigationButtons';
import { DownloadWorkerManager } from '../../../shared/workers/download/downloadWorkerManager';

export default function ProcessingStep() {
  const { container, tracks: _tracks, downloadStatus } = useContext(MusicContext);
  const dispatchMusicAction = useContext(MusicDispatchContext);
  const dispatchStepAction = useContext(StepsDispatchContext);

  // Filter out tracks that were selected f or download
  const selectedTracks = useMemo(() => _tracks.filter((track) => track.selected), [_tracks]);

  // Move each track into respective list according to status
  const tracksToDownload: Track[] = [];
  const tracksToRetry: Track[] = [];
  const downloadedTracks: Track[] = [];
  selectedTracks.forEach((track) => {
    if (track.downloadStatus === DownloadStatusEnum.FINISHED) downloadedTracks.push(track);
    else if (GlobalConstants.Music.RETRYABLE_STATUSES.includes(track.downloadStatus)) tracksToRetry.push(track);
    else tracksToDownload.push(track);
  });

  // Calculate current and total progress for progress bar
  const progressableTracks = useMemo(
    () => selectedTracks.filter((track) => !GlobalConstants.Music.RETRYABLE_STATUSES.includes(track.downloadStatus)),
    [selectedTracks]
  );
  const totalProgress = useMemo(() => progressableTracks.length * 100, [progressableTracks.length]);
  const currentProgress = progressableTracks.reduce((total, track) => total + track.downloadProgress, 0);
  const currentProgressPercentage = progressableTracks.length > 0 ? (currentProgress / totalProgress) * 100 : 0; // If no progressable tracks, set current progress to 0

  // Calculate global download status and set icon accordingly
  const downloadsFinished =
    GlobalConstants.Music.FINAL_STATUSES.includes(downloadStatus) && downloadedTracks.length > 0;
  let ProcessingIcon = Settings;
  if (downloadsFinished) ProcessingIcon = Check;

  // Create handlers
  const handleStartVideoDownloads = () =>
    DownloadWorkerManager.addTracks(selectedTracks, container!, dispatchMusicAction);
  const handleCancelVideoDownloads = () => DownloadWorkerManager.cancelAllTrackDownloads(dispatchMusicAction);
  const onNext = () => dispatchStepAction({ type: StepActionType.PROGRESS });
  const onBack = () => dispatchStepAction({ type: StepActionType.GO_BACK });
  const onRetry = (track: Track) => DownloadWorkerManager.addTracks([track], container!, dispatchMusicAction);
  const onCancel = (track: Track) => DownloadWorkerManager.cancelTrackDownload(track, dispatchMusicAction);

  return (
    <Fragment>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" gutterBottom>
          {TranslationConstants.LABELS.PROCESSING_STEP_TITLE}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} mb={2}>
          <NavigationButtons onBack={onBack} onNext={onNext} canProgress={downloadsFinished} />
        </Box>
      </Box>
      <Box
        mb={2}
        sx={{
          display: downloadStatus !== DownloadStatusEnum.WAITING_FOR_START ? 'block' : 'none',
        }}
      >
        <LinearProgressWithLabel
          variant={downloadStatus === DownloadStatusEnum.PROCESSING ? 'indeterminate' : 'determinate'}
          value={currentProgressPercentage}
        />
      </Box>
      <Divider sx={{ mb: 2 }} />
      <Stack direction="row" justifyContent="space-between">
        <Typography>{TranslationConstants.LABELS.PENDING_DOWNLOADS}</Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} gap={1} justifyContent="flex-end" mb={2}>
          {
            <Button
              variant="contained"
              color="error"
              onClick={handleCancelVideoDownloads}
              disabled={!GlobalConstants.Music.INTERMEDIATE_STATUSES.includes(downloadStatus)}
            >
              {TranslationConstants.BUTTONS.CANCEL_ALL}
            </Button>
          }
          <LoadingButtonCustomIcon
            variant="contained"
            onClick={handleStartVideoDownloads}
            disabled={downloadStatus !== DownloadStatusEnum.WAITING_FOR_START}
            loading={GlobalConstants.Music.INTERMEDIATE_STATUSES.includes(downloadStatus)}
            loadingIcon={<Settings />}
            endIcon={<ProcessingIcon />}
            loadingPosition="end"
          >
            {TranslationConstants.BUTTONS[downloadStatus]}
          </LoadingButtonCustomIcon>
        </Stack>
      </Stack>
      <TrackProcessingList
        tracks={tracksToDownload}
        emptyListMessage={TranslationConstants.LABELS.NO_PENDING_DOWNLOADS}
        onRetry={onRetry}
        onCancel={onCancel}
      ></TrackProcessingList>
      <NavigationButtons onBack={onBack} onNext={onNext} canProgress={downloadsFinished} gutterTop gutterBottom />
      <Divider />
      {tracksToRetry.length > 0 && (
        <Fragment>
          <TrackProcessingList
            tracks={tracksToRetry}
            title={TranslationConstants.LABELS.FAILED_DOWNLOADS}
            emptyListMessage={TranslationConstants.LABELS.NO_FAILED_DOWNLOADS}
            onRetry={onRetry}
            onCancel={onCancel}
          ></TrackProcessingList>
          <NavigationButtons onBack={onBack} onNext={onNext} canProgress={downloadsFinished} gutterTop gutterBottom />
          <Divider />
        </Fragment>
      )}
      <TrackProcessingList
        tracks={downloadedTracks}
        title={TranslationConstants.LABELS.FINISHED_DOWNLOADS}
        emptyListMessage={TranslationConstants.LABELS.NO_FINISHED_DOWNLOADS}
        onRetry={onRetry}
        onCancel={onCancel}
      ></TrackProcessingList>
      <NavigationButtons onBack={onBack} onNext={onNext} canProgress={downloadsFinished} gutterTop />
    </Fragment>
  );
}
