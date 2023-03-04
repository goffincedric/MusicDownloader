import { MusicAction, MusicActionType } from './MusicActions';
import { Track } from '../../models/track';
import { DownloadStatusEnum } from '../../enums/downloadStatusEnum';
import { downloadTracksReducer } from './reducers/DownloadTracksReducer';

export interface MusicState {
  url?: string;
  downloadStatus: DownloadStatusEnum;
  tracks: Track[];
}

export const initialMusicState: MusicState = {
  downloadStatus: DownloadStatusEnum.WAITING_FOR_START,
  tracks: [],
};

export const MusicReducer = (
  state: MusicState,
  action: MusicAction
): MusicState => {
  switch (action.type) {
    case MusicActionType.SET_URL:
      return {
        ...state,
        url: action.url,
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
      const tracks = state.tracks;
      const index = state.tracks.findIndex(
        (track) => track.url === action.updatedTrack.url
      );
      tracks[index] = action.updatedTrack;
      return {
        ...state,
        tracks,
      };
    case MusicActionType.DOWNLOAD_TRACKS:
      let newState: DownloadStatusEnum = state.downloadStatus;
      if (state.downloadStatus === DownloadStatusEnum.WAITING_FOR_START) {
        newState = DownloadStatusEnum.PROCESSING;
        const tracksToDownload = state.tracks.filter(
          (track) =>
            track.selected &&
            track.downloadStatus === DownloadStatusEnum.WAITING_FOR_START
        );
        downloadTracksReducer(
          tracksToDownload,
          action.dispatchMusicAction
        ).catch((error) =>
          // TODO: HANDLE PROMISE ERROR YA LAZY BUM
          console.error('TODO: HANDLE PROMISE ERROR YA LAZY BUM', error)
        );
      }
      return {
        ...state,
        downloadStatus: newState,
      };
    case MusicActionType.RESET:
      return JSON.parse(JSON.stringify(initialMusicState));
    default:
      throw Error(`Unknown music action: ${action}`);
  }
};
