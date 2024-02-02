/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MusicDetails } from './MusicDetails';
import type { ThumbnailDetails } from './ThumbnailDetails';
import type { TimeSpan } from './TimeSpan';
export type TrackDetails = {
  id?: string | null;
  url?: string | null;
  authorName?: string | null;
  title?: string | null;
  duration?: TimeSpan;
  isLive?: boolean | null;
  thumbnails?: Array<ThumbnailDetails> | null;
  musicDetails?: MusicDetails;
};
