import { Track } from '../../../shared/models/track';
import { Box, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { Download, FolderZip } from '@mui/icons-material';
import { TranslationConstants } from '../../../shared/constants/translation.constants';
import { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

interface TracksBulkDownloadProps {
  tracks: Track[];
}

export default function TracksBulkDownload({
  tracks,
}: TracksBulkDownloadProps) {
  const [isLoading, setIsLoading] = useState(false);
  const size = 80;
  const handleBulkDownload = async () => {
    setIsLoading(true);
    const zip = new JSZip();
    tracks.forEach((track) => zip.file(track.fileName!, track.file!));
    const zipFile = await zip.generateAsync({ type: 'blob' });
    saveAs(zipFile, 'tracks.zip');
    setIsLoading(false);
  };
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 2,
        mb: 2,
      }}
    >
      <FolderZip sx={{ color: grey[500], width: size, height: size }} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
        }}
      >
        <Typography>Download all tracks as ZIP.</Typography>
        <LoadingButton
          variant="contained"
          onClick={handleBulkDownload}
          sx={{ mt: 1 }}
          loading={isLoading}
          endIcon={<Download />}
          loadingPosition="end"
        >
          {TranslationConstants.BUTTONS.DOWNLOAD_ALL}
        </LoadingButton>
      </Box>
    </Box>
  );
}
