// Action types
export enum StepActionType {
  SET_PROGRESSION_ALLOWED = 'SET_PROGRESSION_ALLOWED',
  PROGRESS = 'PROGRESS',
  GO_BACK = 'GO_BACK',
  RESET = 'RESET',
}

export type StepAction = SetProgressionAction | ProgressAction | GoBackAction | ResetAction;

// Actions
export interface SetProgressionAction {
  type: StepActionType.SET_PROGRESSION_ALLOWED;
  progressionAllowed: boolean;
}

export interface ProgressAction {
  type: StepActionType.PROGRESS;
}

export interface GoBackAction {
  type: StepActionType.GO_BACK;
}

export interface ResetAction {
  type: StepActionType.RESET;
}
