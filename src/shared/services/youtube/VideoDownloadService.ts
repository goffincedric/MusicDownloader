import axios, { AxiosProgressEvent, AxiosResponse } from 'axios';
import { OpenAPI } from '../openapi';

export class VideoDownloadService {
  /**
   * @param url
   * @param onDownloadProgress
   * @returns Downloaded blob file
   */
  public static getYoutubeVideoDownload(
    url: string,
    onDownloadProgress: (progressEvent: AxiosProgressEvent) => void
  ): Promise<AxiosResponse> {
    return axios.get('/youtube/video/download', {
      baseURL: OpenAPI.BASE,
      params: { url },
      responseType: 'blob',
      onDownloadProgress,
    });
  }
}
