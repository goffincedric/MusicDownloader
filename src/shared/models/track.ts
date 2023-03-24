import { CancelablePromise, ThumbnailDetails } from '../services/openapi';
import { YoutubeUtils } from '../utils/youtube.utils';
import { DownloadStatusEnum } from '../enums/downloadStatusEnum';

export abstract class Track {
  public downloadStatus: DownloadStatusEnum;
  public downloadProgress: number;
  public downloadPromise?: CancelablePromise<File>;
  public file?: File;

  protected constructor(
    public id: string,
    public author: string,
    public title: string,
    public url: string,
    public thumbnail: ThumbnailDetails,
    public selected: boolean = false
  ) {
    const videoId = YoutubeUtils.getVideoId(url);
    if (videoId === null) throw Error('Invalid track id');
    this.downloadStatus = DownloadStatusEnum.WAITING_FOR_START;
    this.downloadProgress = 0;
  }
}
