/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Author } from './Author';
import type { PlaylistId } from './PlaylistId';
import type { Thumbnail } from './Thumbnail';
import type { TimeSpan } from './TimeSpan';
import type { VideoId } from './VideoId';

export type PlaylistVideo = {
    playlistId?: PlaylistId;
    id?: VideoId;
    readonly url?: string | null;
    title?: string | null;
    author?: Author;
    duration?: TimeSpan;
    thumbnails?: Array<Thumbnail> | null;
};
