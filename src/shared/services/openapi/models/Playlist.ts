/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Author } from './Author';
import type { PlaylistId } from './PlaylistId';
import type { Thumbnail } from './Thumbnail';

export type Playlist = {
    id?: PlaylistId;
    readonly url?: string | null;
    title?: string | null;
    author?: Author;
    description?: string | null;
    thumbnails?: Array<Thumbnail> | null;
};
