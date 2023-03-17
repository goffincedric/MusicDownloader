import { RegexConstants } from '../constants/regex.constants';
import { YoutubeUrlType } from '../enums/youtubeUrlType';
import { ThumbnailDetails } from '../services/openapi';

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
  getBestThumbnail(thumbnails: ThumbnailDetails[]): ThumbnailDetails {
    return thumbnails.reduce((best, current) => {
      if (!best || current.area! > best.area!)
        return current;
      return best;
    });
  },
};
