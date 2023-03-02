/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Author } from './Author';
import type { Engagement } from './Engagement';
import type { Thumbnail } from './Thumbnail';
import type { TimeSpan } from './TimeSpan';
import type { VideoId } from './VideoId';

export type Video = {
    id?: VideoId;
    readonly url?: string | null;
    title?: string | null;
    author?: Author;
    uploadDate?: string;
    description?: string | null;
    duration?: TimeSpan;
    thumbnails?: Array<Thumbnail> | null;
    keywords?: Array<string> | null;
    engagement?: Engagement;
};
