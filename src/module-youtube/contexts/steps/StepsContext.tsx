import { createContext, Dispatch, PropsWithChildren, useReducer } from 'react';
import { initialStepsState, StepperState, StepsReducer } from './StepsReducer';
import { StepAction } from './StepActions';

export const StepsContext = createContext<StepperState>({} as StepperState);
export const StepsDispatchContext = createContext<Dispatch<StepAction>>(
  {} as Dispatch<StepAction>
);

export const StepsProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(StepsReducer, initialStepsState);
  return (
    <StepsContext.Provider value={state}>
      <StepsDispatchContext.Provider value={dispatch}>
        {children}
      </StepsDispatchContext.Provider>
    </StepsContext.Provider>
  );
};
