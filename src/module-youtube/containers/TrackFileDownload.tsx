import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { TranslationConstants } from '../../shared/constants/translation.constants';
import { AudioFile, Download } from '@mui/icons-material';
import { saveAs } from 'file-saver';
import { Button } from '@mui/material';
import { grey } from '@mui/material/colors';

interface TrackFileDownloadProps {
  file: File;
}
export default function TrackFileDownload({ file }: TrackFileDownloadProps) {
  const handleFileDownload = () => saveAs(file, file.name);
  const size = 60;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        px: 2,
        pb: 2,
        gap: 2,
      }}
    >
      <AudioFile sx={{ color: grey[500], width: size, height: size }} />
      <Box>
        <Typography variant="body2">{file.name}</Typography>
        <Button variant="contained" sx={{ mt: 1 }} endIcon={<Download />} onClick={handleFileDownload}>
          {TranslationConstants.BUTTONS.DOWNLOAD}
        </Button>
      </Box>
    </Box>
  );
}
