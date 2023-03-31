import { StepAction, StepActionType } from './StepActions';

export interface StepperState {
  currentStep: number;
  canProgress: boolean;
}

export const initialStepsState: StepperState = {
  currentStep: 0,
  canProgress: false,
};

export const StepsReducer = (
  state: StepperState,
  action: StepAction
): StepperState => {
  switch (action.type) {
    case StepActionType.SET_PROGRESSION_ALLOWED:
      return {
        ...state,
        canProgress: action.progressionAllowed,
      };
    case StepActionType.PROGRESS:
      return {
        ...state,
        currentStep: state.currentStep + 1,
        canProgress: false,
      };
    case StepActionType.GO_BACK:
      return {
        ...state,
        currentStep: state.currentStep - 1,
      };
    case StepActionType.RESET:
      return JSON.parse(JSON.stringify(initialStepsState));
    default:
      throw Error(`Unknown music action: ${action}`);
  }
};
