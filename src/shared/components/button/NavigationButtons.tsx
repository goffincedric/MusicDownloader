import { Button } from '@mui/material';
import { TranslationConstants } from '../../constants/translation.constants';
import { LoadingButton } from '@mui/lab';
import { NavigateNext } from '@mui/icons-material';
import Box from '@mui/material/Box';
import { ConditionalWrapper } from '../hoc/ConditionalWrapper';
import { FunctionUtils } from '../../utils/function.utils';

interface NavigationButtonProps {
  onBack?: () => void;
  onNext?: () => void;
  isSubmitButton?: boolean;
  canProgress?: boolean;
  isProgressing?: boolean;
  showBackButton?: boolean;
  showNextButton?: boolean;
  backButtonText?: string;
  nextButtonText?: string;
  gutterBottom?: boolean;
  gutterTop?: boolean;
  fullHeight?: boolean;
}
export default function NavigationButtons({
  onBack = FunctionUtils.noOp,
  onNext = FunctionUtils.noOp,
  canProgress,
  isProgressing,
  isSubmitButton,
  showBackButton = true,
  showNextButton = true,
  backButtonText = TranslationConstants.BUTTONS.BACK,
  nextButtonText = TranslationConstants.BUTTONS.NEXT,
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
          <Button variant="text" onClick={() => onBack()}>
            {backButtonText}
          </Button>
        )}
        {showNextButton && (
          <LoadingButton
            type={isSubmitButton ? 'submit' : 'button'}
            variant="contained"
            onClick={() => onNext()}
            sx={{ ml: 1 }}
            disabled={!canProgress}
            loading={isProgressing}
            endIcon={<NavigateNext />}
            loadingPosition="end"
          >
            {nextButtonText}
          </LoadingButton>
        )}
      </Box>
    </ConditionalWrapper>
  );
}
