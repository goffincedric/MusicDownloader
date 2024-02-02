import { StorageConstants } from '../../constants/storage.constants';

export class AuthenticationStorage {
  static setAPIKey(token: string): void {
    localStorage.setItem(StorageConstants.KEYS.AUTHENTICATION.API_TOKEN, token);
  }

  static getAPIKey(): string | null {
    return localStorage.getItem(StorageConstants.KEYS.AUTHENTICATION.API_TOKEN);
  }

  static setJwtToken(token: string): void {
    localStorage.setItem(StorageConstants.KEYS.AUTHENTICATION.JWT_TOKEN, token);
  }

  static getJwtToken(): string | null {
    return localStorage.getItem(StorageConstants.KEYS.AUTHENTICATION.JWT_TOKEN);
  }

  static logout(): void {
    this.removeAPIKey();
    this.removeJwtToken();
  }

  private static removeAPIKey(): void {
    localStorage.removeItem(StorageConstants.KEYS.AUTHENTICATION.API_TOKEN);
  }

  private static removeJwtToken(): void {
    localStorage.removeItem(StorageConstants.KEYS.AUTHENTICATION.JWT_TOKEN);
  }
}
