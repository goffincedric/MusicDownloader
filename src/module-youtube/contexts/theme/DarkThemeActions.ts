import { DarkThemeMode } from '../../../shared/enums/darkThemeModeEnum';

// Action types
export enum DarkThemeActionType {
  SET_DARK_MODE = 'SET_DARK_MODE',
}

export type DarkThemeAction = SetDarkMode;

// Actions

export interface SetDarkMode {
  type: DarkThemeActionType.SET_DARK_MODE;
  mode: DarkThemeMode;
}
