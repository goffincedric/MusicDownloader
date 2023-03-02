import { Thumbnail } from '../services/openapi';
import { YoutubeUtils } from '../utils/youtube.utils';
import { Track } from './track';

export class YoutubeTrack extends Track {
  public videoId: string;
  constructor(
    public author: string,
    public title: string,
    public url: string,
    public thumbnail: Thumbnail,
    public selected: boolean = false
  ) {
    super(author, title, url, thumbnail, selected);
    const videoId = YoutubeUtils.getVideoId(url);
    if (videoId === null) throw Error("Invalid track id");
    this.videoId = videoId;
  }
}
