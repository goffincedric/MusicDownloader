import { Track } from '../../models/track';
import { GlobalConstants } from '../../constants/global.constants';
import { DownloadStatusEnum } from '../../enums/downloadStatusEnum';
import { Dispatch } from 'react';
import { MusicAction, MusicActionType } from '../../contexts/music/MusicActions';
import { DownloadWorker } from './DownloadWorker';

const queue: Track[] = [];
const workers: DownloadWorker[] = [];

function addTracks(tracks: Track[], container: string, dispatchMusicAction: Dispatch<MusicAction>) {
  // Set downloaderStatus to processing if not processing yet
  if (workers.length === 0)
    dispatchMusicAction({
      type: MusicActionType.SET_DOWNLOAD_STATUS,
      downloadStatus: DownloadStatusEnum.PROCESSING,
    });

  // Add tracks to queue and update workers
  queue.push(
    ...tracks.map((track) => {
      track.downloadPromise = undefined;
      return track;
    })
  );
  updateWorkers(container, dispatchMusicAction);
}

function cancelAllTrackDownloads(dispatchMusicAction: Dispatch<MusicAction>) {
  // Cancel all downloads and stop workers
  [...queue].forEach((track) => cancelTrackDownload(track, dispatchMusicAction));
  [...workers].forEach((worker) => {
    worker.stop();
    removeWorker(worker.id);
  });
  // Set status to cancelled
  dispatchMusicAction({
    type: MusicActionType.SET_DOWNLOAD_STATUS,
    downloadStatus: DownloadStatusEnum.CANCELLED,
  });
}

function cancelTrackDownload(track: Track, dispatchMusicAction: Dispatch<MusicAction>): void {
  // If track is downloading and wasn't cancelled yet, cancel it
  if (track.downloadPromise?.isCancelled === false) return track.downloadPromise.cancel();
  // Otherwise, remove from queue and set status to cancelled
  const index = queue.findIndex((queuedTrack) => queuedTrack.id === track.id);
  if (index >= 0) queue.splice(index, 1);
  track.downloadProgress = 0;
  track.downloadStatus = DownloadStatusEnum.CANCELLED;
}

function updateWorkers(container: string, dispatchMusicAction: Dispatch<MusicAction>) {
  while (queue.length > 0 && workers.length < GlobalConstants.Music.MAX_CONCURRENT_DOWNLOADS) {
    // Create worker and add to list
    const worker = new DownloadWorker(queue, container, dispatchMusicAction);
    workers.push(worker);
    // Start worker
    worker.start().then(
      () => {
        console.info('Shutting down worker');
        // Remove worker from queue
        removeWorker(worker.id);
        // Update download status if is last worker
        if (workers.length === 0)
          dispatchMusicAction({
            type: MusicActionType.SET_DOWNLOAD_STATUS,
            downloadStatus: worker.stopped ? DownloadStatusEnum.CANCELLED : DownloadStatusEnum.FINISHED,
          });
      },
      () => {
        console.warn('Worker crashed, restarting');
        // Remove worker from queue
        removeWorker(worker.id);
        // Create new worker
        updateWorkers(container, dispatchMusicAction);
      }
    );
  }
}

function removeWorker(workerId: string) {
  const index = workers.findIndex((worker) => worker.id === workerId);
  workers.splice(index, 1);
}

export const DownloadWorkerManager = { addTracks, cancelTrackDownload, cancelAllTrackDownloads };
