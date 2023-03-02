/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Video } from '../models/Video';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class VideoService {

    /**
     * @param url 
     * @returns Video Success
     * @throws ApiError
     */
    public static getYoutubeVideo(
url?: string,
): CancelablePromise<Video> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/youtube/video',
            query: {
                'url': url,
            },
        });
    }

    /**
     * @param url 
     * @returns binary Success
     * @throws ApiError
     */
    public static getYoutubeVideoDownload(
url?: string,
): CancelablePromise<Blob> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/youtube/video/download',
            query: {
                'url': url,
            },
        });
    }

}
