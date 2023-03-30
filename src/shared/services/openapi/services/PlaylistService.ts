/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PlaylistDetailsExtended } from '../models/PlaylistDetailsExtended';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PlaylistService {

    /**
     * @param url 
     * @returns PlaylistDetailsExtended Success
     * @throws ApiError
     */
    public static getYoutubePlaylist(
url?: string,
): CancelablePromise<PlaylistDetailsExtended> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/youtube/playlist',
            query: {
                'url': url,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                500: `Server Error`,
            },
        });
    }

}
