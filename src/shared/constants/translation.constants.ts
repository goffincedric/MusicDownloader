import { DownloadStatusEnum } from '../enums/downloadStatusEnum';
import { DarkThemeMode } from '../enums/darkThemeModeEnum';

export const TranslationConstants = {
  GENERAL: {
    APP_TITLE: 'MUSIC DOWNLOADER',
  },
  LABELS: {
    LOGIN_TITLE: 'Log in',
    LOGIN_TEXT: 'Authenticate yourself below with the provided API key.',
    URL_STEP_TITLE: 'Youtube url',
    TRACK_CHOICE_STEP_TITLE: 'Track choice',
    TRACK_CHOICE_STEP_SUB_TITLE: 'Choose tracks to download',
    PROCESSING_STEP_TITLE: 'Processing',
    DOWNLOAD_STEP_TITLE: 'Download',
    DOWNLOAD: 'Download',
    URL: 'Url',
    CONTAINER: 'Desired format',
    API_KEY: 'Api key',
    [DownloadStatusEnum.WAITING_FOR_START]: 'Waiting to start download...',
    [DownloadStatusEnum.PROCESSING]: 'Processing track...',
    [DownloadStatusEnum.DOWNLOADING]: 'Downloading track...',
    [DownloadStatusEnum.FINISHED]: 'Download finished',
    [DownloadStatusEnum.FAILED]: 'Download failed. Click to retry...',
    [DownloadStatusEnum.CANCELLED]: 'Download cancelled.',
    NO_PENDING_DOWNLOADS: 'No pending downloads...',
    NO_FAILED_DOWNLOADS: 'No failed downloads...',
    NO_FINISHED_DOWNLOADS: 'No tracks were downloaded yet...',
    PENDING_DOWNLOADS: 'Pending downloads',
    FAILED_DOWNLOADS: 'Failed downloads',
    FINISHED_DOWNLOADS: 'Finished downloads',
    DOWNLOADED_TRACKS: 'Downloaded tracks',
    NO_DOWNLOADABLE_TRACKS: 'No tracks ready for download...',
    STEPS_COMPLETED_THANKS: 'Thanks for using our website!',
    STEPS_COMPLETED_RETRY: 'Want to download another video/playlist? Click the button below to start over!',
    MP3: 'mp3',
    OGG: 'ogg',
    SOURCE: 'source',
    NEVER_SHOW_DIALOG_AGAIN: 'Never ask this again',
  },
  DIALOGS: {
    PROCESSING_ALERT_FAILED_TRACKS: {
      TITLE: 'Continue with failed downloads?',
      DESCRIPTION: (hasFailedTracks: boolean, hasCancelledTracks: boolean) => {
        let text = 'Some track downloads';
        if (hasCancelledTracks) text += ' got cancelled';
        if (hasCancelledTracks && hasFailedTracks) text += ' or';
        if (hasFailedTracks) text += ' failed';
        text += '.';
        return text;
      },
      QUESTION: 'Do you want to continue anyway?',
    },
    NO_TRACKS_DOWNLOADED: {
      TITLE: 'No tracks have been downloaded yet',
      DESCRIPTION:
        "You haven't downloaded any processed tracks yet. Think of all those wasted cpu cycles... (﻿ᴛ﻿﹏﻿ᴛ﻿)",
      QUESTION: 'Do you want to continue anyway?',
    },
  },
  PLACEHOLDERS: {
    YOUTUBE_URL: 'Enter your youtube video or playlist url here...',
    CONTAINER: 'Select your desired audio format',
    API_KEY: 'Enter your API key here...',
  },
  BUTTONS: {
    NEXT: 'Next',
    FINISH: 'Finish',
    BACK: 'Go back',
    CANCEL: 'Cancel',
    CANCEL_ALL: 'Cancel all',
    [DownloadStatusEnum.WAITING_FOR_START]: 'Start processing',
    [DownloadStatusEnum.PROCESSING]: 'Processing',
    [DownloadStatusEnum.DOWNLOADING]: 'Downloading',
    [DownloadStatusEnum.FINISHED]: 'Processing completed',
    [DownloadStatusEnum.FAILED]: 'Processing completed',
    [DownloadStatusEnum.CANCELLED]: 'Processing cancelled',
    SELECT_ALL: 'Select all',
    DESELECT_ALL: 'Deselect all',
    DOWNLOAD: 'Download',
    DOWNLOAD_ALL: 'Download all',
    DOWNLOAD_MORE: 'Download more',
    [DarkThemeMode.LIGHT]: 'Light',
    [DarkThemeMode.NATIVE]: 'System',
    [DarkThemeMode.DARK]: 'Dark',
    LOGIN: 'Login',
    LOGOUT: 'Logout',
    CONTINUE: 'Continue',
  },
};
