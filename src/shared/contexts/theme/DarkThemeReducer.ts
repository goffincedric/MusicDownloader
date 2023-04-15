import { DarkThemeAction, DarkThemeActionType } from './DarkThemeActions';
import { setDarkModeReducer } from './reducers/SetDarkModeReducer';
import { DarkThemeMode } from '../../enums/darkThemeModeEnum';
import { PreferenceStorage } from '../../storage/preference/PreferenceStorage';

export interface DarkThemeState {
  currentMode: DarkThemeMode;
}

export const initialDarkThemeState: DarkThemeState = {
  currentMode: PreferenceStorage.getThemePreference() ?? DarkThemeMode.NATIVE,
};

export const DarkThemeReducer = (state: DarkThemeState, action: DarkThemeAction): DarkThemeState => {
  switch (action.type) {
    case DarkThemeActionType.SET_DARK_MODE:
      return setDarkModeReducer(state, action);
    default:
      throw Error(`Unknown theme action: ${action}`);
  }
};
