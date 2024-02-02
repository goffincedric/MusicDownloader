import { Track } from '../../shared/models/track';
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import TrackProcessingStatus from './TrackProcessingStatus';
import DynamicTrackCard from './DynamicTrackCard';
import React, { Fragment } from 'react';
import { FunctionUtils } from '../../shared/utils/function.utils';
import { DownloadStatusEnum } from '../../shared/enums/downloadStatusEnum';

interface TrackProcessingListProps {
  tracks: Track[];
  title?: string;
  emptyListMessage: string;
  onRetry?: (track: Track) => void;
  onCancel?: (track: Track) => void;
}

export default function TrackProcessingList({
  tracks,
  title,
  emptyListMessage,
  onRetry = FunctionUtils.noOp,
  onCancel = FunctionUtils.noOp,
}: TrackProcessingListProps) {
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
                {track.downloadStatus !== DownloadStatusEnum.WAITING_FOR_START && (
                  <TrackProcessingStatus
                    downloadStatus={track.downloadStatus}
                    downloadProgress={track.downloadProgress}
                    downloadedBytesProgress={track.downloadedBytesProgress}
                    onRetry={() => onRetry(track)}
                    onCancel={() => onCancel(track)}
                  />
                )}
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
