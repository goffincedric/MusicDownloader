/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TrackDetails } from '../models/TrackDetails';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class VideoService {

    /**
     * @param url 
     * @returns TrackDetails Success
     * @throws ApiError
     */
    public static getYoutubeVideo(
url?: string,
): CancelablePromise<TrackDetails> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/youtube/video',
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

    /**
     * @param container 
     * @param url 
     * @returns binary Success
     * @throws ApiError
     */
    public static getYoutubeVideoDownload(
container: string,
url?: string,
): CancelablePromise<Blob> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/youtube/video/download/{container}',
            path: {
                'container': container,
            },
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
