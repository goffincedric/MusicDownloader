import { DarkThemeAction, DarkThemeActionType } from './DarkThemeActions';
import { ThemeOptions } from '@mui/material';
import { setDarkModeReducer } from './reducers/SetDarkModeReducer';
import { DarkThemeMode } from '../../../shared/enums/darkThemeModeEnum';
import { ThemeConstants } from '../../../shared/constants/theme.constants';

export interface DarkThemeState {
  currentMode: DarkThemeMode;
  themeOptions: ThemeOptions;
}

export const initialDarkThemeState: DarkThemeState = {
  currentMode: DarkThemeMode.NATIVE,
  themeOptions: ThemeConstants.darkTheme,
};

export const DarkThemeReducer = (state: DarkThemeState, action: DarkThemeAction): DarkThemeState => {
  switch (action.type) {
    case DarkThemeActionType.SET_DARK_MODE:
      return {
        ...state,
        currentMode: action.mode,
        themeOptions: setDarkModeReducer(state.themeOptions, action),
      };
    default:
      throw Error(`Unknown theme action: ${action}`);
  }
};
