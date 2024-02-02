/* generated using openapi-typescript-codegen -- do no edit */
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
     * @param url
     * @param container
     * @returns binary Success
     * @throws ApiError
     */
    public static getYoutubeVideoDownload(
        url?: string,
        container?: string,
    ): CancelablePromise<Blob> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/youtube/video/download',
            query: {
                'url': url,
                'container': container,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                500: `Server Error`,
            },
        });
    }
}
