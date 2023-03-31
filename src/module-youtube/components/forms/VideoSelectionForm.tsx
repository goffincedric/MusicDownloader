import Grid from '@mui/material/Grid';
import { Track } from '../../../shared/models/track';
import Box from '@mui/material/Box';
import { Button, CardActions, Checkbox, Divider, FormControlLabel } from '@mui/material';
import Typography from '@mui/material/Typography';
import { TranslationConstants } from '../../../shared/constants/translation.constants';
import DynamicTrackCard from '../../containers/DynamicTrackCard';
import NavigationButtons from '../../../shared/components/button/NavigationButtons';
import { Fragment } from 'react';

interface VideoSelectionFormProps {
  onCardSelected: (track: Track) => void;
  onToggleAllSelected: (selected: boolean) => void;
  tracks: Track[];
  onNext: () => void;
  onBack: () => void;
  canProgress: boolean;
  loading: boolean;
}

export default function VideoSelectionForm({
  tracks,
  onCardSelected,
  onToggleAllSelected,
  onNext,
  onBack,
  canProgress,
  loading,
}: VideoSelectionFormProps) {
  const someUnselectedSelected = tracks.some((track) => !track.selected);
  return (
    <Fragment>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" gutterBottom>
          {TranslationConstants.LABELS.TRACK_CHOICE_STEP_TITLE}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} mb={2}>
          <NavigationButtons onBack={onBack} onNext={onNext} canProgress={canProgress} isProgressing={loading} gutterTop={false} />
        </Box>
      </Box>
      <Divider sx={{ mb: 2 }} />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
        }}
      >
        <Typography variant="h6">{TranslationConstants.LABELS.TRACK_CHOICE_STEP_SUB_TITLE}</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} mb={2}>
          <Button
            variant={someUnselectedSelected ? 'contained' : 'text'}
            onClick={() => onToggleAllSelected(someUnselectedSelected)}
          >
            {someUnselectedSelected
              ? TranslationConstants.BUTTONS.SELECT_ALL
              : TranslationConstants.BUTTONS.DESELECT_ALL}
          </Button>
        </Box>
      </Box>
      <Grid container spacing={3} justifyContent="center">
        {tracks.length === 1 ? (
          <Grid item xs={12}>
            <DynamicTrackCard
              track={tracks[0]}
              coverPosition="top"
              isSelectable
              onCardSelected={() => onCardSelected(tracks[0])}
            >
              <CardActions sx={{ width: '100%', px: 2 }}>
                <FormControlLabel
                  control={
                    <Checkbox checked={tracks[0].selected} onSelect={() => onCardSelected(tracks[0])}></Checkbox>
                  }
                  label={TranslationConstants.LABELS.DOWNLOAD}
                />
              </CardActions>
            </DynamicTrackCard>
          </Grid>
        ) : (
          tracks.map((track, index) => (
            <Grid key={index} item xs={12} sm={6} md={4}>
              <DynamicTrackCard
                track={track}
                coverPosition="top"
                isSelectable
                onCardSelected={() => onCardSelected(track)}
              >
                <CardActions sx={{ width: '100%', px: 2 }}>
                  <FormControlLabel
                    control={<Checkbox checked={track.selected} onSelect={() => onCardSelected(track)}></Checkbox>}
                    label={TranslationConstants.LABELS.DOWNLOAD}
                  />
                </CardActions>
              </DynamicTrackCard>
            </Grid>
          ))
        )}
      </Grid>
      <NavigationButtons onBack={onBack} onNext={onNext} canProgress={canProgress} isProgressing={loading} gutterTop />
    </Fragment>
  );
}
