import { createContext, Dispatch, PropsWithChildren, useReducer } from 'react';
import { DarkThemeReducer, DarkThemeState, initialDarkThemeState } from './DarkThemeReducer';
import { DarkThemeAction } from './DarkThemeActions';

export const DarkThemeContext = createContext<DarkThemeState>(initialDarkThemeState);
export const DarkThemeDispatchContext = createContext<Dispatch<DarkThemeAction>>({} as Dispatch<DarkThemeAction>);

export const DarkThemeProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(DarkThemeReducer, initialDarkThemeState);
  return (
    <DarkThemeContext.Provider value={state}>
      <DarkThemeDispatchContext.Provider value={dispatch}>{children}</DarkThemeDispatchContext.Provider>
    </DarkThemeContext.Provider>
  );
};
