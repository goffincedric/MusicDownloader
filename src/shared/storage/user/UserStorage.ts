import { User } from '../../models/user';
import { AuthenticationStorage } from '../authentication/AuthenticationStorage';
import { jwtDecode } from "jwt-decode";

export class UserStorage {
  static getUser(): User | null {
    const jwtToken = AuthenticationStorage.getJwtToken();
    if (!jwtToken) return null;
    return jwtDecode<User>(jwtToken);
  }
}
