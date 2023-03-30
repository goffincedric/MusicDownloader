import { Fragment, useContext, useMemo } from 'react';
import { MusicContext, MusicDispatchContext } from '../../../shared/contexts/music/MusicContext';
import { DownloadStatusEnum } from '../../../shared/enums/downloadStatusEnum';
import { Divider, Stack } from '@mui/material';
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
import TrackProcessingList from '../lists/TrackProcessingList';
import NavigationButtons from '../../../shared/components/button/NavigationButtons';
import { DownloadWorker } from '../../../shared/workers/downloadWorker';

export default function ProcessingStep() {
  const { tracks: _tracks, downloadStatus } = useContext(MusicContext);
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
    else if (track.downloadStatus === DownloadStatusEnum.FAILED) tracksToRetry.push(track);
    else tracksToDownload.push(track);
  });

  // Calculate progress for progress bar
  const countedTracks = useMemo(
    () => selectedTracks.filter((track) => !GlobalConstants.Music.RETRYABLE_STATUSES.includes(track.downloadStatus)),
    [selectedTracks]
  );
  const totalProgress = useMemo(() => countedTracks.length * 100, [countedTracks.length]);
  const currentProgress = countedTracks.reduce((total, track) => total + track.downloadProgress, 0);
  const currentProgressPercentage = (currentProgress / totalProgress) * 100;

  // Calculate global download progress and set icon accordingly
  const downloadsFinished = GlobalConstants.Music.FINAL_STATUSES.includes(downloadStatus);
  let ProcessingIcon = Settings;
  if (downloadsFinished) ProcessingIcon = Check;

  // Create handlers
  const handleStartVideoDownloads = () => DownloadWorker.addTracks(selectedTracks, dispatchMusicAction);
  const onNext = () => dispatchStepAction({ type: StepActionType.PROGRESS });
  const onBack = () => dispatchStepAction({ type: StepActionType.GO_BACK });

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
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} mb={2}>
          <LoadingButtonCustomIcon
            variant="contained"
            sx={{ ml: 1 }}
            onClick={handleStartVideoDownloads}
            disabled={downloadStatus !== DownloadStatusEnum.WAITING_FOR_START}
            loading={GlobalConstants.Music.INTERMEDIATE_STATUSES.includes(downloadStatus)}
            loadingIcon={<Settings />}
            endIcon={<ProcessingIcon />}
            loadingPosition="end"
          >
            {TranslationConstants.BUTTONS[downloadStatus]}
          </LoadingButtonCustomIcon>
        </Box>
      </Stack>
      <TrackProcessingList
        tracks={tracksToDownload}
        emptyListMessage={TranslationConstants.LABELS.NO_PENDING_DOWNLOADS}
      ></TrackProcessingList>
      <NavigationButtons onBack={onBack} onNext={onNext} canProgress={downloadsFinished} gutterTop gutterBottom />
      <Divider />
      {tracksToRetry.length > 0 && (
        <Fragment>
          <TrackProcessingList
            tracks={tracksToRetry}
            title={TranslationConstants.LABELS.FAILED_DOWNLOADS}
            emptyListMessage={TranslationConstants.LABELS.NO_FAILED_DOWNLOADS}
          ></TrackProcessingList>
          <NavigationButtons onBack={onBack} onNext={onNext} canProgress={downloadsFinished} gutterTop gutterBottom />
          <Divider />
        </Fragment>
      )}
      <TrackProcessingList
        tracks={downloadedTracks}
        title={TranslationConstants.LABELS.FINISHED_DOWNLOADS}
        emptyListMessage={TranslationConstants.LABELS.NO_FINISHED_DOWNLOADS}
      ></TrackProcessingList>
      <NavigationButtons onBack={onBack} onNext={onNext} canProgress={downloadsFinished} gutterTop />
    </Fragment>
  );
}
