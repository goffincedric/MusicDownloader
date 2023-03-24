import { Button } from '@mui/material';
import { TranslationConstants } from '../constants/translation.constants';
import { LoadingButton } from '@mui/lab';
import { NavigateNext } from '@mui/icons-material';
import Box from '@mui/material/Box';
import { ConditionalWrapper } from './hoc/ConditionalWrapper';

interface NavigationButtonProps {
  onBack?: () => void;
  onNext?: () => void;
  isSubmitButton?: boolean;
  canProgress?: boolean;
  isProgressing?: boolean;
  showBackButton?: boolean;
  showNextButton?: boolean;
  gutterBottom?: boolean;
  gutterTop?: boolean;
  fullHeight?: boolean;
}
export default function NavigationButtons({
  onBack,
  onNext,
  canProgress,
  isProgressing,
  isSubmitButton,
  showBackButton = true,
  showNextButton = true,
  gutterBottom = false,
  gutterTop = false,
  fullHeight = false,
}: NavigationButtonProps) {
  return (
    <ConditionalWrapper condition={() => !fullHeight} wrapper={Box}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          mb: gutterBottom ? 2 : 0,
          mt: gutterTop ? 3 : 0,
        }}
      >
        {showBackButton && (
          <Button variant="text" onClick={onBack}>
            {TranslationConstants.BUTTONS.BACK}
          </Button>
        )}
        {showNextButton && (
          <LoadingButton
            type={isSubmitButton ? 'submit' : 'button'}
            variant="contained"
            onClick={onNext}
            sx={{ ml: 1 }}
            disabled={!canProgress}
            loading={isProgressing}
            endIcon={<NavigateNext />}
            loadingPosition="end"
          >
            {TranslationConstants.BUTTONS.NEXT}
          </LoadingButton>
        )}
      </Box>
    </ConditionalWrapper>
  );
}
