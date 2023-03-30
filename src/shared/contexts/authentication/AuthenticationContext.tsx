import { createContext, Dispatch, PropsWithChildren, useReducer } from 'react';
import { AuthenticationReducer, AuthenticationState, initialAuthenticationState } from './AuthenticationReducer';
import { AuthenticationAction } from './AuthenticationActions';

export const AuthenticationContext = createContext<AuthenticationState>({} as AuthenticationState);
export const AuthenticationDispatchContext = createContext<Dispatch<AuthenticationAction>>({} as Dispatch<AuthenticationAction>);

export const AuthenticationProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(AuthenticationReducer, initialAuthenticationState);
  return (
    <AuthenticationContext.Provider value={state}>
      <AuthenticationDispatchContext.Provider value={dispatch}>{children}</AuthenticationDispatchContext.Provider>
    </AuthenticationContext.Provider>
  );
};
