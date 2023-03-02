import { createContext, Dispatch, PropsWithChildren, useReducer } from 'react';
import { initialMusicState, MusicReducer, MusicState } from './MusicReducer';
import { MusicAction } from './MusicActions';
import { DownloadStatusEnum } from '../../../shared/enums/downloadStatusEnum';

export const MusicContext = createContext<MusicState>({} as MusicState);
export const MusicDispatchContext = createContext<Dispatch<MusicAction>>(
  {} as Dispatch<MusicAction>
);

export const MusicProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(MusicReducer, initialMusicState);
  return (
    <MusicContext.Provider value={state}>
      <MusicDispatchContext.Provider value={dispatch}>
        {children}
      </MusicDispatchContext.Provider>
    </MusicContext.Provider>
  );
};
