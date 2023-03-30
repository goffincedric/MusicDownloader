// Action types
export enum AuthenticationActionType {
  AUTHENTICATE = 'AUTHENTICATE',
  LOGOUT = 'LOGOUT',
}

export type AuthenticationAction = AuthenticateAction | LogoutAction;

// Actions
export interface AuthenticateAction {
  type: AuthenticationActionType.AUTHENTICATE;
  apiKey: string;
  jwtToken: string;
}

export interface LogoutAction {
  type: AuthenticationActionType.LOGOUT;
}
