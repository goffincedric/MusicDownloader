/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ThumbnailDetails } from './ThumbnailDetails';
import type { TrackDetails } from './TrackDetails';

export type PlaylistDetailsExtended = {
    id?: string | null;
    url?: string | null;
    authorName?: string | null;
    title?: string | null;
    thumbnails?: Array<ThumbnailDetails> | null;
    tracks?: Array<TrackDetails> | null;
};
