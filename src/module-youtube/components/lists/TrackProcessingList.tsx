import { Track } from '../../../shared/models/track';
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';

import TrackProcessingStatus from '../../containers/TrackProcessingStatus';
import DynamicTrackCard from '../../containers/DynamicTrackCard';

interface TrackProcessingListProps {
  tracks: Track[];
  emptyListMessage: string;
}

export default function TrackProcessingList({
  tracks,
  emptyListMessage,
}: TrackProcessingListProps) {
  return (
    <Grid container spacing={3} justifyContent="center" mb={1}>
      {tracks.length ? (
        tracks.map((track, index) => (
          <Grid key={index} item xs={12} md={6}>
            <DynamicTrackCard track={track} coverPosition="left">
              <TrackProcessingStatus
                downloadStatus={track.downloadStatus}
                downloadProgress={track.downloadProgress}
                onRetry={() => console.log('retry', track)}
              />
            </DynamicTrackCard>
          </Grid>
        ))
      ) : (
        <Typography
          variant="subtitle1"
          color="text.secondary"
          component="div"
          mt={4}
        >
          {emptyListMessage}
        </Typography>
      )}
    </Grid>
  );
}
