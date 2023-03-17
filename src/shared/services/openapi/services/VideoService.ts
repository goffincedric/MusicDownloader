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
                500: `Server Error`,
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
            errors: {
                400: `Bad Request`,
                500: `Server Error`,
            },
        });
    }

}
