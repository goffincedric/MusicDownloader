import { MusicAction, MusicActionType } from './MusicActions';
import { Track } from '../../models/track';
import { DownloadStatusEnum } from '../../enums/downloadStatusEnum';

export interface MusicState {
  url?: string;
  container?: string;
  downloadStatus: DownloadStatusEnum;
  tracks: Track[];
}

export const initialMusicState: MusicState = {
  downloadStatus: DownloadStatusEnum.WAITING_FOR_START,
  tracks: [],
};

export const MusicReducer = (state: MusicState, action: MusicAction): MusicState => {
  switch (action.type) {
    case MusicActionType.SET_URL:
      return {
        ...state,
        url: action.url,
        container: action.container
      };
    case MusicActionType.SET_TRACKS:
      return {
        ...state,
        tracks: [...action.tracks],
      };
    case MusicActionType.SET_TRACK_SELECTION:
      return {
        ...state,
        tracks: state.tracks.map((track) => {
          if (track.url === action.track.url) track.selected = action.selected;
          return track;
        }),
      };
    case MusicActionType.SET_ALL_TRACKS_SELECTED:
      return {
        ...state,
        tracks: state.tracks.map((track) => {
          track.selected = action.selected;
          return track;
        }),
      };
    case MusicActionType.SET_DOWNLOAD_STATUS:
      return {
        ...state,
        downloadStatus: action.downloadStatus,
      };
    case MusicActionType.UPDATE_TRACK:
      const index = state.tracks.findIndex((track) => track.id === action.updatedTrack.id);
      state.tracks[index] = action.updatedTrack;
      return {
        ...state,
        tracks: [...state.tracks],
      };
    case MusicActionType.RESET:
      return JSON.parse(JSON.stringify(initialMusicState));
    default:
      throw Error(`Unknown music action: ${JSON.stringify(action)}`);
  }
};
