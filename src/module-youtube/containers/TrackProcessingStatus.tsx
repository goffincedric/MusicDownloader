import { DownloadStatusEnum } from '../../shared/enums/downloadStatusEnum';
import Box from '@mui/material/Box';
import { Avatar, CircularProgress, Fab, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import { TranslationConstants } from '../../shared/constants/translation.constants';
import { Close, DownloadDone, Refresh } from '@mui/icons-material';
import { green } from '@mui/material/colors';

interface TrackProcessingStatusProps {
  downloadStatus: DownloadStatusEnum;
  downloadProgress: number;
  onRetry: () => void;
  onCancel: () => void;
}

export default function TrackProcessingStatus({
  downloadStatus,
  downloadProgress,
  onRetry,
  onCancel,
}: TrackProcessingStatusProps): JSX.Element {
  const size = 50;
  const sizeSmall = 40;
  let content: JSX.Element | null = null;
  let action: JSX.Element | null = null;
  if (downloadStatus === DownloadStatusEnum.FINISHED) {
    content = (
      <Avatar sx={{ bgcolor: green[500], width: size, height: size }}>
        <DownloadDone />
      </Avatar>
    );
  } else if ([DownloadStatusEnum.FAILED, DownloadStatusEnum.CANCELLED].includes(downloadStatus)) {
    action = (
      <Fab
        aria-label="save"
        color="error"
        sx={{ width: sizeSmall, height: sizeSmall, transform: 'scaleX(-1)' }}
        onClick={onRetry}
      >
        <Refresh />
      </Fab>
    );
  } else {
    content = (
      <Stack direction="row">
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
          <CircularProgress
            size={size}
            variant={downloadProgress ? 'determinate' : 'indeterminate'}
            value={downloadProgress}
          />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="caption" component="div" color="text.secondary">{`${Math.round(
              downloadProgress
            )}%`}</Typography>
          </Box>
        </Box>
      </Stack>
    );
    action = (
      <Fab
        aria-label="save"
        color="error"
        sx={{ width: sizeSmall, height: sizeSmall, transform: 'scaleX(-1)' }}
        onClick={onCancel}
      >
        <Close />
      </Fab>
    );
  }

  return (
    <Stack direction="row" alignItems="center" gap={2} flexWrap="wrap" pb={2} px={2}>
      {content && <Box sx={{ height: size, width: size }}>{content}</Box>}
      <Stack direction="row" alignItems="center" gap={2}>
        <Typography variant="body2">{TranslationConstants.LABELS[downloadStatus]}</Typography>
        {action}
      </Stack>
    </Stack>
  );
}
