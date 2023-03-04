import { Fragment, useContext } from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Step from '@mui/material/Step';
import { GlobalConstants } from '../../shared/constants/global.constants';
import { StepsCompleted } from './StepsCompleted';
import { StepsContext } from '../../shared/contexts/steps/StepsContext';
import { StepLabel, Stepper } from '@mui/material';

const steps = GlobalConstants.Steps;

function getStepContent(index: number) {
  const Step = steps[index].component;
  return <Step />;
}

export default function YoutubeSteps() {
  const { currentStep } = useContext(StepsContext);

  return (
    <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
      <Paper elevation={3} sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Stepper
          activeStep={currentStep}
          sx={{ pt: 3, pb: 3 }}
          alternativeLabel
        >
          {GlobalConstants.Steps.map((step, index) => (
            <Step key={index}>
              <StepLabel>{step.label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {currentStep === steps.length ? (
          <StepsCompleted />
        ) : (
          <Fragment>{getStepContent(currentStep)}</Fragment>
        )}
      </Paper>
    </Container>
  );
}
