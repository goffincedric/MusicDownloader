import { Fragment, useContext, useMemo } from 'react';
import {
  MusicContext,
  MusicDispatchContext,
} from '../../contexts/music/MusicContext';
import { DownloadStatusEnum } from '../../../shared/enums/downloadStatusEnum';
import { Divider } from '@mui/material';
import Typography from '@mui/material/Typography';
import { TranslationConstants } from '../../../shared/constants/translation.constants';
import Box from '@mui/material/Box';
import { Track } from '../../../shared/models/track';
import { MusicActionType } from '../../contexts/music/MusicActions';
import LinearProgressWithLabel from '../../../shared/components/LinearProgressWithLabel';
import { Check, Settings } from '@mui/icons-material';
import { StepsDispatchContext } from '../../contexts/steps/StepsContext';
import { StepActionType } from '../../contexts/steps/StepActions';
import { GlobalConstants } from '../../../shared/constants/global.constants';
import LoadingButtonCustomIcon from '../../../shared/components/LoadingButtonCustomIcon';
import TrackProcessingList from '../lists/TrackProcessingList';
import NavigationButtons from '../../../shared/components/NavigationButtons';

export default function ProcessingStep() {
  const { tracks: _tracks, downloadStatus } = useContext(MusicContext);
  const dispatchMusicAction = useContext(MusicDispatchContext);
  const dispatchStepAction = useContext(StepsDispatchContext);
  const selectedTracks = useMemo(
    () => _tracks.filter((track) => track.selected),
    [_tracks]
  );
  const tracksToDownload: Track[] = [];
  const downloadedTracks: Track[] = [];
  selectedTracks.forEach((track) => {
    if (track.downloadStatus !== DownloadStatusEnum.FINISHED)
      tracksToDownload.push(track);
    else downloadedTracks.push(track);
  });
  const totalProgress = useMemo(
    () => selectedTracks.length * 100,
    [selectedTracks.length]
  );
  const currentProgress = selectedTracks.reduce(
    (total, track) => total + track.downloadProgress,
    0
  );
  const currentProgressPercentage = (currentProgress / totalProgress) * 100;

  const handleStartVideoDownloads = () =>
    dispatchMusicAction({
      type: MusicActionType.DOWNLOAD_TRACKS,
      dispatchMusicAction,
    });

  const onNext = () => dispatchStepAction({ type: StepActionType.PROGRESS });
  const onBack = () => dispatchStepAction({ type: StepActionType.GO_BACK });

  const downloadsFinished =
    GlobalConstants.Music.FINAL_STATUSES.includes(downloadStatus);
  let ProcessingIcon = Settings;
  if (downloadsFinished) ProcessingIcon = Check;

  return (
    <Fragment>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" gutterBottom>
          {TranslationConstants.LABELS.PROCESSING_STEP_TITLE}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} mb={2}>
          <LoadingButtonCustomIcon
            variant="contained"
            sx={{ ml: 1 }}
            onClick={handleStartVideoDownloads}
            disabled={downloadStatus !== DownloadStatusEnum.WAITING_FOR_START}
            loading={GlobalConstants.Music.INTERMEDIATE_STATUSES.includes(
              downloadStatus
            )}
            loadingIcon={<Settings />}
            endIcon={<ProcessingIcon />}
            loadingPosition="end"
          >
            {TranslationConstants.BUTTONS[downloadStatus]}
          </LoadingButtonCustomIcon>
        </Box>
      </Box>
      <Box
        mb={2}
        sx={{
          display:
            downloadStatus !== DownloadStatusEnum.WAITING_FOR_START
              ? 'block'
              : 'none',
        }}
      >
        <LinearProgressWithLabel
          variant={
            downloadStatus === DownloadStatusEnum.PROCESSING
              ? 'indeterminate'
              : 'determinate'
          }
          value={currentProgressPercentage}
        />
      </Box>
      <Divider />
      <Typography variant="h6" mt={2} mb={2}>
        {TranslationConstants.LABELS.PENDING_DOWNLOADS}
      </Typography>
      <TrackProcessingList
        tracks={tracksToDownload}
        emptyListMessage={TranslationConstants.LABELS.NO_PENDING_DOWNLOADS}
      />
      <NavigationButtons
        onBack={onBack}
        onNext={onNext}
        canProgress={downloadsFinished}
        gutterBottom
      />
      <Divider />
      <Typography variant="h6" mt={2} mb={2}>
        {TranslationConstants.LABELS.FINISHED_DOWNLOADS}
      </Typography>
      <TrackProcessingList
        tracks={downloadedTracks}
        emptyListMessage={TranslationConstants.LABELS.NO_FINISHED_DOWNLOADS}
      ></TrackProcessingList>
      <NavigationButtons
        onBack={onBack}
        onNext={onNext}
        canProgress={downloadsFinished}
      />
    </Fragment>
  );
}
