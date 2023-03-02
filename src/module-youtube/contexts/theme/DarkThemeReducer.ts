import { DarkThemeAction, DarkThemeActionType } from './DarkThemeActions';
import { DarkThemeMode } from '../../../shared/enums/darkThemeModeEnum';

export interface DarkThemeState {
  currentMode: DarkThemeMode;
}

export const initialDarkThemeState: DarkThemeState = {
  currentMode: DarkThemeMode.NATIVE,
};

export const DarkThemeReducer = (
  state: DarkThemeState,
  action: DarkThemeAction
): DarkThemeState => {
  switch (action.type) {
    case DarkThemeActionType.SET_DARK_MODE:
      return {
        ...state,
        currentMode: action.mode,
      };
    default:
      throw Error(`Unknown theme action: ${action}`);
  }
};
