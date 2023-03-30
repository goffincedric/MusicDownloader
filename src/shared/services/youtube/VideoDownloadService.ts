import axios, { AxiosProgressEvent, AxiosResponse } from 'axios';
import { CancelablePromise, OpenAPI } from '../openapi';
import { AxiosUtils } from '../../utils/axios.utils';

export class VideoDownloadService {
  /**
   * @param url
   * @param onDownloadProgress
   * @returns Downloaded file
   */
  public static getYoutubeVideoDownload(
    url: string,
    onDownloadProgress: (progressEvent: AxiosProgressEvent) => void
  ): CancelablePromise<File> {
    return new CancelablePromise(async (resolve, reject, onCancel) => {
      try {
        if (!onCancel.isCancelled) {
          // Create cancellation handler and token
          const cancellationHandler = axios.CancelToken.source();
          onCancel(() => cancellationHandler.cancel('Cancellation requested'));
          // Await response with cancellation token
          const response = await axios.get('/youtube/video/download', {
            baseURL: OpenAPI.BASE,
            headers: AxiosUtils.getAuthHeader(),
            params: { url },
            responseType: 'blob',
            onDownloadProgress,
            cancelToken: cancellationHandler.token,
          });
          return resolve(new File([response.data], AxiosUtils.getFilenameFromHeaders(response)));
        }
      } catch (error) {
        reject(error);
      }
    });
  }
}
