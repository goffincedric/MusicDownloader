/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Playlist } from '../models/Playlist';
import type { PlaylistVideo } from '../models/PlaylistVideo';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PlaylistService {

    /**
     * @param url 
     * @returns Playlist Success
     * @throws ApiError
     */
    public static getYoutubePlaylist(
url?: string,
): CancelablePromise<Playlist> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/youtube/playlist',
            query: {
                'url': url,
            },
        });
    }

    /**
     * @param url 
     * @returns PlaylistVideo Success
     * @throws ApiError
     */
    public static getYoutubePlaylistVideos(
url?: string,
): CancelablePromise<Array<PlaylistVideo>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/youtube/playlist/videos',
            query: {
                'url': url,
            },
        });
    }

}
