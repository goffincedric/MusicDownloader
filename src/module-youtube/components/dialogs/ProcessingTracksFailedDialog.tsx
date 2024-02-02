import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
} from '@mui/material';
import { TranslationConstants } from '../../../shared/constants/translation.constants';
import { PreferenceStorage } from '../../../shared/storage/preference/PreferenceStorage';
import { StorageConstants } from '../../../shared/constants/storage.constants';
import { useMemo, useState } from 'react';

interface ProcessingTracksFailedDialogProps {
  hasFailedTracks: boolean;
  hasCancelledTracks: boolean;
  isOpen: boolean;
  onCancel: () => void;
  onContinue: () => void;
}

export const ProcessingTracksFailedDialog = ({
  hasFailedTracks,
  hasCancelledTracks,
  isOpen,
  onCancel,
  onContinue,
}: ProcessingTracksFailedDialogProps) => {
  // Future alert visibility state
  const [showAlertNextTime, setVisibilityFlag] = useState(
    PreferenceStorage.getAlertVisibilityPreference(
      StorageConstants.KEYS.ALERT_VISIBILITY.CONTINUE_WITH_FAILED_DOWNLOADS,
    ),
  );
  // Construct description
  const description = useMemo(
    () => TranslationConstants.DIALOGS.PROCESSING_ALERT_FAILED_TRACKS.DESCRIPTION(hasFailedTracks, hasCancelledTracks),
    [hasCancelledTracks, hasFailedTracks],
  );

  const handleContinue = () => {
    PreferenceStorage.setAlertVisibilityPreference(
      StorageConstants.KEYS.ALERT_VISIBILITY.CONTINUE_WITH_FAILED_DOWNLOADS,
      showAlertNextTime,
    );
    onContinue();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {TranslationConstants.DIALOGS.PROCESSING_ALERT_FAILED_TRACKS.TITLE}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{description}</DialogContentText>
        <br />
        <DialogContentText id="alert-dialog-description">
          {TranslationConstants.DIALOGS.PROCESSING_ALERT_FAILED_TRACKS.QUESTION}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <FormControlLabel
          value={!showAlertNextTime}
          control={<Checkbox />}
          label={TranslationConstants.LABELS.NEVER_SHOW_DIALOG_AGAIN}
          onChange={(_, checked) => setVisibilityFlag(!checked)}
          sx={{ mr: 'auto', ml: 0 }}
        />
        <Button onClick={onCancel}>{TranslationConstants.BUTTONS.CANCEL}</Button>
        <Button onClick={handleContinue} autoFocus>
          {TranslationConstants.BUTTONS.CONTINUE}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
