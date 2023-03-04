import { ThemeOptions } from '@mui/material';
import { DarkThemeAction } from '../DarkThemeActions';
import { DarkThemeMode } from '../../../enums/darkThemeModeEnum';
import { ThemeConstants } from '../../../constants/theme.constants';

export const setDarkModeReducer = (themeOptions: ThemeOptions, action: DarkThemeAction): ThemeOptions => {
  // Decide new mode
  let isDarkMode = true;
  if (action.mode === DarkThemeMode.NATIVE) isDarkMode = ThemeConstants.prefersDarkTheme();
  else if (action.mode === DarkThemeMode.LIGHT) isDarkMode = false;
  // Update themeOptions accordingly
  return JSON.parse(
    JSON.stringify(isDarkMode ? ThemeConstants.darkTheme : ThemeConstants.lightTheme)
  );
};
