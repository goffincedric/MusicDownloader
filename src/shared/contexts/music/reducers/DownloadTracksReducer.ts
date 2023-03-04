import { MusicAction, MusicActionType } from '../MusicActions';
import { DownloadStatusEnum } from '../../../enums/downloadStatusEnum';
import { Track } from '../../../models/track';
import { AxiosProgressEvent } from 'axios';
import { Dispatch } from 'react';
import { VideoDownloadService } from '../../../services/youtube/VideoDownloadService';
import { AxiosUtils } from '../../../utils/axios.utils';
import { GlobalConstants } from '../../../constants/global.constants';

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

async function downloadTrack(
  queue: Track[],
  trackToDownload: Track,
  dispatchMusicAction: Dispatch<MusicAction>
): Promise<void> {
  // Set track to processing
  trackToDownload.downloadStatus = DownloadStatusEnum.PROCESSING;
  // Start downloading video
  const result = await VideoDownloadService.getYoutubeVideoDownload(
    trackToDownload.url,
    (progressEvent) =>
      handleDownloadProgress(
        trackToDownload,
        progressEvent,
        dispatchMusicAction
      )
  );
  // Update download status
  trackToDownload.downloadStatus = DownloadStatusEnum.FINISHED;
  trackToDownload.downloadProgress = 100;
  trackToDownload.file = new Blob([result.data]);
  trackToDownload.fileName = AxiosUtils.getFilenameFromHeaders(result);

  // Download next track in queue recursively if available
  if (queue.length > 0)
    return downloadTrack(queue, queue.shift()!, dispatchMusicAction);
}

export const downloadTracksReducer = async (
  tracksToDownload: Track[],
  dispatchMusicAction: Dispatch<MusicAction>
) => {
  // Set status
  dispatchMusicAction({
    type: MusicActionType.SET_DOWNLOAD_STATUS,
    downloadStatus: DownloadStatusEnum.PROCESSING,
  });

  // Create download queue
  const queue = [...tracksToDownload];
  // Create and await concurrent track download workers. Maximum workers: MAX_CONCURRENT_DOWNLOADS or queue length
  const workers = queue
    .slice(
      0,
      Math.min(queue.length, GlobalConstants.Music.MAX_CONCURRENT_DOWNLOADS)
    )
    .map(() => downloadTrack(queue, queue.shift()!, dispatchMusicAction));
  await Promise.all(workers);

  // Set status to finished
  dispatchMusicAction({
    type: MusicActionType.SET_DOWNLOAD_STATUS,
    downloadStatus: DownloadStatusEnum.FINISHED,
  });
};
