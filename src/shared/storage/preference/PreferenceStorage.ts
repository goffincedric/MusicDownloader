import { StorageConstants } from '../../constants/storage.constants';
import { DarkThemeMode } from '../../enums/darkThemeModeEnum';

export class PreferenceStorage {

  static setThemePreference(theme: DarkThemeMode): void {
    localStorage.setItem(StorageConstants.KEYS.PREFERENCES.THEME, theme);
  }

  static getThemePreference(): DarkThemeMode | null {
    return localStorage.getItem(StorageConstants.KEYS.PREFERENCES.THEME) as DarkThemeMode;
  }

  static setContainerPreference(token: string): void {
    localStorage.setItem(StorageConstants.KEYS.PREFERENCES.CONTAINER, token);
  }

  static getContainerPreference(): string | null {
    return localStorage.getItem(StorageConstants.KEYS.PREFERENCES.CONTAINER);
  }

  static setAlertVisibilityPreference(alert: string, visibility: boolean): void {
    localStorage.setItem(alert, JSON.stringify(visibility));
  }

  static getAlertVisibilityPreference(alert: string): boolean {
    const preference = localStorage.getItem(alert);
    if (preference) return JSON.parse(preference);
    return true;
  }
}