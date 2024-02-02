import { DarkThemeMode } from '../enums/darkThemeModeEnum';
import { ThemeConstants } from '../constants/theme.constants';
import { ThemeOptions } from '@mui/material';

export const ThemeUtils = {
  resolveTheme: (mode: DarkThemeMode): ThemeOptions => {
    // Decide new mode
    let isDarkMode = true;
    if (mode === DarkThemeMode.NATIVE) isDarkMode = ThemeConstants.prefersDarkTheme();
    else if (mode === DarkThemeMode.LIGHT) isDarkMode = false;
    // Map to theme and return
    return isDarkMode ? ThemeConstants.darkTheme : ThemeConstants.lightTheme;
  },
};
