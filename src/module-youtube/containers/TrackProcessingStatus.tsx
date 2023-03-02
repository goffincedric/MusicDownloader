import { DownloadStatusEnum } from '../../shared/enums/downloadStatusEnum';
import Box from '@mui/material/Box';
import { Avatar, CircularProgress, Fab } from '@mui/material';
import Typography from '@mui/material/Typography';
import { TranslationConstants } from '../../shared/constants/translation.constants';
import { DownloadDone, Refresh } from '@mui/icons-material';
import { green } from '@mui/material/colors';

interface TrackProcessingStatusProps {
  downloadStatus: DownloadStatusEnum;
  downloadProgress: number;
  onRetry: () => void;
}
export default function TrackProcessingStatus({
  downloadStatus,
  downloadProgress,
  onRetry,
}: TrackProcessingStatusProps) {
  const size = 50;
  let content: JSX.Element;
  if (downloadStatus === DownloadStatusEnum.FINISHED) {
    content = (
      <Avatar sx={{ bgcolor: green[500], width: size, height: size }}>
        <DownloadDone />
      </Avatar>
    );
  } else if (downloadStatus === DownloadStatusEnum.FAILED) {
    content = (
      <Fab
        aria-label="save"
        color="error"
        sx={{ width: size, height: size, transform: 'scaleX(-1)' }}
        onClick={onRetry}
      >
        {/* Other icons: RestartAlt, Sync, Cached */}
        <Refresh />
      </Fab>
    );
  } else {
    content = (
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress
          size={50}
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
          <Typography
            variant="caption"
            component="div"
            color="text.secondary"
          >{`${Math.round(downloadProgress)}%`}</Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display:
          downloadStatus !== DownloadStatusEnum.WAITING_FOR_START
            ? 'flex'
            : 'none',
        alignItems: 'center',
        pl: 2,
        pb: 2,
      }}
    >
      <Box sx={{ mr: 2, width: 50, height: 50 }}>{content}</Box>
      <Typography variant="body2">
        {TranslationConstants.LABELS[downloadStatus]}
      </Typography>
    </Box>
  );
}
