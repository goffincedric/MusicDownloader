import { Track } from '../../../shared/models/track';
import { Divider, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import TrackFileDownload from '../../containers/TrackFileDownload';
import DynamicTrackCard from '../../containers/DynamicTrackCard';
import { MusicActionType } from '../../../shared/contexts/music/MusicActions';
import { useContext } from 'react';
import { MusicDispatchContext } from '../../../shared/contexts/music/MusicContext';

interface TrackDownloadsListProps {
  title: string;
  tracks: Track[];
  emptyListMessage: string;
}
export default function TrackDownloadList({ title, tracks, emptyListMessage }: TrackDownloadsListProps) {
  const dispatchMusicAction = useContext(MusicDispatchContext);
  const handleDownload = (track: Track) => {
    track.downloadedLocally = true;
    dispatchMusicAction({ type: MusicActionType.UPDATE_TRACK, updatedTrack: track });
  };
  return (
    <Grid container spacing={3} justifyContent="center" mb={3}>
      <Grid item xs={12}>
        <Divider sx={{ mb: 1 }} />
        <Typography variant="h6">{title}</Typography>
      </Grid>
      {tracks.length ? (
        tracks.map((track, index) => (
          <Grid key={index} item xs={12} sm={6} md={4}>
            <DynamicTrackCard track={track} coverPosition="top">
              <TrackFileDownload file={track.file!} onDownload={() => handleDownload(track)} />
            </DynamicTrackCard>
          </Grid>
        ))
      ) : (
        <Typography variant="subtitle1" color="text.secondary" component="div" mt={4}>
          {emptyListMessage}
        </Typography>
      )}
    </Grid>
  );
}
