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

interface NoTracksDownloadedDialogProps {
  isOpen: boolean;
  onCancel: () => void;
  onContinue: () => void;
}

export const NoTracksDownloadedDialog = ({ isOpen, onCancel, onContinue }: NoTracksDownloadedDialogProps) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{TranslationConstants.DIALOGS.NO_TRACKS_DOWNLOADED.TITLE}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {TranslationConstants.DIALOGS.NO_TRACKS_DOWNLOADED.DESCRIPTION}
        </DialogContentText>
        <br />
        <DialogContentText id="alert-dialog-description">
          {TranslationConstants.DIALOGS.NO_TRACKS_DOWNLOADED.QUESTION}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>{TranslationConstants.BUTTONS.CANCEL}</Button>
        <Button onClick={onContinue} autoFocus>
          {TranslationConstants.BUTTONS.CONTINUE}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
