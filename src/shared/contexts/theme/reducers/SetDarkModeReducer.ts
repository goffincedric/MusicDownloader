import { DarkThemeAction } from '../DarkThemeActions';
import { PreferenceStorage } from '../../../storage/preference/PreferenceStorage';
import { DarkThemeState } from '../DarkThemeReducer';

export const setDarkModeReducer = (state: DarkThemeState, action: DarkThemeAction): DarkThemeState => {
  // Save preference
  PreferenceStorage.setThemePreference(action.mode);
  // Update state
  return {
    ...state,
    currentMode: action.mode
  };
};
