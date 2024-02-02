import { YoutubeUtils } from '../utils/youtube.utils';
import { Track } from './track';
import { ThumbnailDetails } from '../services/openapi';

export class YoutubeTrack extends Track {
  public videoId: string;
  constructor(
    public id: string,
    public author: string,
    public title: string,
    public url: string,
    public thumbnail: ThumbnailDetails,
    public selected: boolean = false,
  ) {
    super(id, author, title, url, thumbnail, selected);
    const videoId = YoutubeUtils.getVideoId(url);
    if (videoId === null) throw Error('Invalid track id');
    this.videoId = videoId;
  }
}
