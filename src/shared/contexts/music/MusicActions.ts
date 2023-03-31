import { Track } from '../../models/track';
import { DownloadStatusEnum } from '../../enums/downloadStatusEnum';

export enum MusicActionType {
  SET_URL = 'SET_URL',
  SET_TRACKS = 'SET_TRACKS',
  SET_TRACK_SELECTION = 'SET_TRACK_SELECTION',
  SET_ALL_TRACKS_SELECTED = 'SET_ALL_TRACKS_SELECTED',
  SET_DOWNLOAD_STATUS = 'SET_DOWNLOAD_STATUS',
  UPDATE_TRACK = 'UPDATE_TRACK',
  RESET = 'RESET',
}

export type MusicAction =
  | SetUrlAction
  | SetTrackAction
  | SetTrackSelectionAction
  | SetAllTracksSelectedAction
  | SetDownloadStatusAction
  | UpdateTrackAction
  | MusicResetAction;

export interface SetUrlAction {
  type: MusicActionType.SET_URL;
  url: string;
  container: string;
}
export interface SetDownloadStatusAction {
  type: MusicActionType.SET_DOWNLOAD_STATUS;
  downloadStatus: DownloadStatusEnum;
}
export interface SetTrackAction {
  type: MusicActionType.SET_TRACKS;
  tracks: Track[];
}
export interface SetTrackSelectionAction {
  type: MusicActionType.SET_TRACK_SELECTION;
  track: Track;
  selected: boolean;
}
export interface SetAllTracksSelectedAction {
  type: MusicActionType.SET_ALL_TRACKS_SELECTED;
  selected: boolean;
}
export interface UpdateTrackAction {
  type: MusicActionType.UPDATE_TRACK;
  updatedTrack: Track;
}
export interface MusicResetAction {
  type: MusicActionType.RESET;
}
