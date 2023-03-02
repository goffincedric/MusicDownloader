import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import { PropsWithChildren } from 'react';
import { Track } from '../../shared/models/track';
import { ConditionalWrapper } from '../../shared/components/hoc/ConditionalWrapper';
import { CardActionArea, SxProps, Theme } from '@mui/material';

interface DynamicTrackCardProps {
  track: Track;
  coverPosition: 'left' | 'right' | 'top';
  isSelectable?: boolean;

  onCardSelected?: () => void;
}

export default function DynamicTrackCard({
  track,
  coverPosition,
  onCardSelected,
  isSelectable = false,
  children,
}: PropsWithChildren<DynamicTrackCardProps>) {
  let coverContent: JSX.Element;
  if (coverPosition === 'top') {
    coverContent = (
      <CardMedia
        component="img"
        height="200"
        image={track.thumbnail.url!}
        alt={`${track.title} by ${track.author}`}
      />
    );
  } else {
    coverContent = (
      <CardMedia
        component="img"
        sx={{ width: 160 }}
        image={track.thumbnail.url!}
        alt={`${track.title} by ${track.author}`}
      />
    );
  }

  // Alignment
  let rootSxProps: SxProps<Theme> = { display: 'flex', height: '100%' };
  if (coverPosition === 'top') {
    rootSxProps.flexDirection = 'column';
    rootSxProps.justifyContent = 'space-between';
  } else if (coverPosition === 'left') {
    rootSxProps.justifyContent = 'flex-start';
  } else {
    rootSxProps.justifyContent = 'space-between';
  }

  return (
    <Card sx={{ height: '100%' }}>
      <ConditionalWrapper
        condition={() => isSelectable}
        wrapper={CardActionArea}
        wrapperProps={{
          sx: { height: '100%' },
          onClick: onCardSelected,
        }}
      >
        <Box sx={rootSxProps}>
          {['top', 'left'].includes(coverPosition) ? coverContent : undefined}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              justifyContent: 'space-between',
            }}
          >
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
                width: '100%',
              }}
            >
              <Typography gutterBottom variant="h5" component="div">
                {track.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                By {track.author}
              </Typography>
            </CardContent>
            {children}
          </Box>
          {coverPosition === 'right' ? coverContent : undefined}
        </Box>
      </ConditionalWrapper>
    </Card>
  );
}
