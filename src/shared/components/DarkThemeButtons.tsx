import { MouseEvent, useContext } from 'react';
import { Paper, SxProps, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { TranslationConstants } from '../constants/translation.constants';
import { DarkThemeContext, DarkThemeDispatchContext } from '../../module-youtube/contexts/theme/DarkThemeContext';
import { DarkThemeActionType } from '../../module-youtube/contexts/theme/DarkThemeActions';
import { DarkThemeMode } from '../enums/darkThemeModeEnum';
import { grey } from '@mui/material/colors';
import { DarkMode, LightMode, SettingsBrightness } from '@mui/icons-material';

export function DarkThemeButtons() {
  const dispatchDarkThemeAction = useContext(DarkThemeDispatchContext);
  const { currentMode } = useContext(DarkThemeContext);
  const handleChange = (_: MouseEvent<HTMLElement>, newMode: DarkThemeMode) => {
    if (newMode)
      dispatchDarkThemeAction({
        type: DarkThemeActionType.SET_DARK_MODE,
        mode: newMode,
      });
  };
  const toggleButtonStyle: SxProps = {
    // color: grey[200],
    textTransform: 'capitalize',
  };
  const iconStyle: SxProps = { mr: 1 };
  return (
    <Paper>
      <ToggleButtonGroup
        value={currentMode}
        onChange={handleChange}
        color="primary"
        exclusive
        aria-label="Dark theme choice"
      >
        <ToggleButton sx={toggleButtonStyle} value={DarkThemeMode.LIGHT}>
          <LightMode sx={iconStyle} />
          {TranslationConstants.BUTTONS[DarkThemeMode.LIGHT]}
        </ToggleButton>
        <ToggleButton sx={toggleButtonStyle} value={DarkThemeMode.NATIVE}>
          <SettingsBrightness sx={iconStyle} />
          {TranslationConstants.BUTTONS[DarkThemeMode.NATIVE]}
        </ToggleButton>
        <ToggleButton sx={toggleButtonStyle} value={DarkThemeMode.DARK}>
          <DarkMode sx={iconStyle} />
          {TranslationConstants.BUTTONS[DarkThemeMode.DARK]}
        </ToggleButton>
      </ToggleButtonGroup>
    </Paper>
  );
}
