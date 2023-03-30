import { AuthenticateAction, AuthenticationAction, AuthenticationActionType } from './AuthenticationActions';
import { User } from '../../models/user';
import { AuthenticationStorage } from '../../storage/authentication/AuthenticationStorage';
import { UserStorage } from '../../storage/user/UserStorage';

export interface AuthenticationState {
  authenticated: boolean;
  currentUser: User | null;
}

export const initialAuthenticationState: AuthenticationState = {
  authenticated: !!AuthenticationStorage.getAPIKey(),
  currentUser: UserStorage.getUser(),
};

export const AuthenticationReducer = (
  state: AuthenticationState,
  action: AuthenticationAction
): AuthenticationState => {
  switch (action.type) {
    case AuthenticationActionType.AUTHENTICATE:
      AuthenticationStorage.setAPIKey(action.apiKey);
      AuthenticationStorage.setJwtToken(action.jwtToken);
      return {
        ...state,
        authenticated: true,
        currentUser: UserStorage.getUser(),
      };
    case AuthenticationActionType.LOGOUT:
      AuthenticationStorage.logout();
      return { authenticated: false, currentUser: null };
    default:
      throw Error(`Unknown music action: ${action}`);
  }
};
