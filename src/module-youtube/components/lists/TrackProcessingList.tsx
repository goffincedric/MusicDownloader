import { Track } from '../../../shared/models/track';
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';

import TrackProcessingStatus from '../../containers/TrackProcessingStatus';
import DynamicTrackCard from '../../containers/DynamicTrackCard';
import { Fragment, useContext } from 'react';
import { MusicDispatchContext } from '../../../shared/contexts/music/MusicContext';
import { DownloadWorker } from '../../../shared/workers/downloadWorker';

interface TrackProcessingListProps {
  tracks: Track[];
  title?: string;
  emptyListMessage: string;
}

export default function TrackProcessingList({ tracks, title, emptyListMessage }: TrackProcessingListProps) {
  const dispatchMusicAction = useContext(MusicDispatchContext);
  return (
    <Fragment>
      {title && (
        <Typography variant="h6" mt={2} mb={2}>
          {title}
        </Typography>
      )}
      <Grid container spacing={3} justifyContent="center" mb={1}>
        {tracks.length ? (
          tracks.map((track, index) => (
            <Grid key={index} item xs={12} md={6}>
              <DynamicTrackCard track={track} coverPosition="left">
                <TrackProcessingStatus
                  downloadStatus={track.downloadStatus}
                  downloadProgress={track.downloadProgress}
                  onRetry={() => DownloadWorker.addTracks([track], dispatchMusicAction)}
                  onCancel={() => DownloadWorker.cancelTrackDownload(track)}
                />
              </DynamicTrackCard>
            </Grid>
          ))
        ) : (
          <Typography variant="subtitle1" color="text.secondary" component="div" mt={4}>
            {emptyListMessage}
          </Typography>
        )}
      </Grid>
    </Fragment>
  );
}
