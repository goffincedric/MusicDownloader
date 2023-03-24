import { Track } from '../models/track';
import { GlobalConstants } from '../constants/global.constants';
import { DownloadStatusEnum } from '../enums/downloadStatusEnum';
import { VideoDownloadService } from '../services/youtube/VideoDownloadService';
import { Dispatch } from 'react';
import { MusicAction, MusicActionType } from '../contexts/music/MusicActions';
import { AxiosProgressEvent } from 'axios';
import { CancelError } from '../services/openapi';

const queue: Track[] = [];
let workerCount = 0;

function addTracks(tracks: Track[], dispatchMusicAction: Dispatch<MusicAction>) {
  // Set downloaderStatus to processing if not processing yet
  if (workerCount === 0)
    dispatchMusicAction({
      type: MusicActionType.SET_DOWNLOAD_STATUS,
      downloadStatus: DownloadStatusEnum.DOWNLOADING,
    });

  // Add tracks to queue and update workers
  queue.push(
    ...tracks.map((track) => {
      track.downloadPromise = undefined;
      return track;
    })
  );
  updateWorkers(dispatchMusicAction);
}

function cancelTrackDownload(track: Track) {
  if (track.downloadPromise?.isCancelled === false) return track.downloadPromise.cancel();
  const index = queue.findIndex((queuedTrack) => queuedTrack.id === track.id);
  if (index >= 0) queue.splice(index, 1);
}

function updateWorkers(dispatchMusicAction: Dispatch<MusicAction>) {
  while (queue.length > 0 && workerCount < GlobalConstants.Music.MAX_CONCURRENT_DOWNLOADS) {
    // Add worker
    workerCount++;
    downloadWorker(dispatchMusicAction).then(
      () => {
        // Decrease worker count
        workerCount--;
        console.info('Shutting down worker');
        // Update queue status if is last worker
        if (workerCount === 0)
          dispatchMusicAction({
            type: MusicActionType.SET_DOWNLOAD_STATUS,
            downloadStatus: DownloadStatusEnum.FINISHED,
          });
      },
      () => {
        console.warn('Worker crashed, restarting');
        // Decrease worker count
        workerCount--;
        updateWorkers(dispatchMusicAction);
      }
    );
  }
}

type DownloadWorker = (dispatchMusicAction: Dispatch<MusicAction>) => Promise<void>;
const downloadWorker: DownloadWorker = async (dispatchMusicAction: Dispatch<MusicAction>) => {
  // Loop until no tracks are left in queue
  while (queue.length > 0) {
    // Get first track in queue
    const trackToDownload = queue.shift()!;

    // Set track to processing
    trackToDownload.downloadStatus = DownloadStatusEnum.PROCESSING;
    try {
      // Start downloading video
      trackToDownload.downloadPromise = VideoDownloadService.getYoutubeVideoDownload(
        trackToDownload.url,
        (progressEvent) => handleDownloadProgress(trackToDownload, progressEvent, dispatchMusicAction)
      );
      // Update track before awaiting download
      dispatchMusicAction({
        type: MusicActionType.UPDATE_TRACK,
        updatedTrack: trackToDownload,
      });
      // Await download
      trackToDownload.file = await trackToDownload.downloadPromise;
      // Update download status
      trackToDownload.downloadStatus = DownloadStatusEnum.FINISHED;
      trackToDownload.downloadProgress = 100;
    } catch (error) {
      // Update track status to indicate failed download
      if (error instanceof CancelError && trackToDownload.downloadPromise?.isCancelled) {
        trackToDownload.downloadStatus = DownloadStatusEnum.CANCELLED;
      } else {
        trackToDownload.downloadStatus = DownloadStatusEnum.FAILED;
      }
      trackToDownload.downloadProgress = 0;
    }
    // Update track after trying download
    dispatchMusicAction({
      type: MusicActionType.UPDATE_TRACK,
      updatedTrack: trackToDownload,
    });
  }
};

// Define download progress handler
const handleDownloadProgress = (
  track: Track,
  progressEvent: AxiosProgressEvent,
  dispatchMusicAction: Dispatch<MusicAction>
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
  track.downloadStatus = newStatus;

  // Update track
  dispatchMusicAction({
    type: MusicActionType.UPDATE_TRACK,
    updatedTrack: track,
  });
};

export const DownloadWorker = { addTracks, cancelTrackDownload };
