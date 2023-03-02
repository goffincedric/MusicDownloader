import { RegexConstants } from '../constants/regex.constants';
import { YoutubeUrlType } from '../enums/youtubeUrlType';
import { Thumbnail } from '../services/openapi';

export const YoutubeUtils = {
  resolveUrlType: (url: string): YoutubeUrlType => {
    const [, videoId, , playlistId] =
      RegexConstants.YOUTUBE.YOUTUBE_URL_REGEX.exec(url) ?? [];
    if (!videoId && !playlistId) return YoutubeUrlType.UNKNOWN;
    if (videoId) return YoutubeUrlType.VIDEO;
    return YoutubeUrlType.PLAYLIST;
  },
  getVideoId: (url: string): string | null => {
    const [, videoId, , playlistId] =
      RegexConstants.YOUTUBE.YOUTUBE_URL_REGEX.exec(url) ?? [];
    return videoId || null;
  },
  getBestThumbnail(thumbnails: Thumbnail[]): Thumbnail {
    return thumbnails.reduce((best, current) => {
      if (!best || current.resolution?.area! > best.resolution?.area!)
        return current;
      return best;
    });
  },
};
