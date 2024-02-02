import { Track } from '../../models/track';
import { Dispatch } from 'react';
import { MusicAction, MusicActionType } from '../../contexts/music/MusicActions';
import { DownloadStatusEnum } from '../../enums/downloadStatusEnum';
import { VideoDownloadService } from '../../services/youtube/VideoDownloadService';
import { CancelError } from '../../services/openapi';
import { AxiosProgressEvent } from 'axios';
import { MusicConstants } from '../../constants/music.constants';

export class DownloadWorker {
  public id = crypto.randomUUID();

  public get stopped() {
    return this._stopped || this.currentDownloadingTrack?.downloadStatus === DownloadStatusEnum.CANCELLED;
  }

  private _stopped = false;
  private currentDownloadingTrack?: Track;

  constructor(
    private sharedQueue: Track[],
    private container: string | undefined = undefined,
    private dispatchMusicAction: Dispatch<MusicAction>,
  ) {}

  async start(): Promise<void> {
    // Loop until no tracks are left in queue
    while (!this._stopped && this.sharedQueue.length > 0) {
      // Get first track in queue that is not downloading
      this.currentDownloadingTrack = this.sharedQueue.shift()!;

      // Set track to processing
      this.currentDownloadingTrack.downloadStatus = DownloadStatusEnum.PROCESSING;
      try {
        // Start downloading video
        this.currentDownloadingTrack.downloadPromise = VideoDownloadService.getYoutubeVideoDownload(
          this.currentDownloadingTrack.url,
          this.container !== MusicConstants.CONTAINERS.SOURCE ? this.container : undefined,
          (progressEvent) =>
            handleDownloadProgress(this.currentDownloadingTrack!, progressEvent, this.dispatchMusicAction),
        );
        // Update track before awaiting download
        this.dispatchMusicAction({
          type: MusicActionType.UPDATE_TRACK,
          updatedTrack: this.currentDownloadingTrack,
        });
        // Await download
        this.currentDownloadingTrack.file = await this.currentDownloadingTrack.downloadPromise;
        // Update download status
        this.currentDownloadingTrack.downloadStatus = DownloadStatusEnum.FINISHED;
        this.currentDownloadingTrack.downloadProgress = 100;
      } catch (error) {
        // Update track status to indicate failed download
        if (error instanceof CancelError && this.currentDownloadingTrack.downloadPromise?.isCancelled) {
          this.currentDownloadingTrack.downloadStatus = DownloadStatusEnum.CANCELLED;
        } else {
          this.currentDownloadingTrack.downloadStatus = DownloadStatusEnum.FAILED;
        }
        this.currentDownloadingTrack.downloadProgress = 0;
      }
      // Update track after trying download
      this.dispatchMusicAction({
        type: MusicActionType.UPDATE_TRACK,
        updatedTrack: this.currentDownloadingTrack,
      });
    }
  }

  stop(): void {
    // Set as stopped and cancel currently downloading track
    this._stopped = true;
    if (this.currentDownloadingTrack?.downloadPromise?.isCancelled === false)
      this.currentDownloadingTrack.downloadPromise.cancel();
  }
}

// Define download progress handler
const handleDownloadProgress = (
  track: Track,
  progressEvent: AxiosProgressEvent,
  dispatchMusicAction: Dispatch<MusicAction>,
) => {
  // Set status as downloading
  dispatchMusicAction({
    type: MusicActionType.SET_DOWNLOAD_STATUS,
    downloadStatus: DownloadStatusEnum.DOWNLOADING,
  });

  // Set new status and progress value
  let newStatus = DownloadStatusEnum.DOWNLOADING;
  const newProgress = (progressEvent.progress ?? 0) * 100;
  if (newProgress === 100) newStatus = DownloadStatusEnum.FINISHED;
  track.downloadProgress = newProgress;
  track.downloadedBytesProgress = progressEvent.loaded;
  track.downloadStatus = newStatus;

  // Update track
  dispatchMusicAction({
    type: MusicActionType.UPDATE_TRACK,
    updatedTrack: track,
  });
};
