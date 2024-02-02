import axios, { AxiosProgressEvent } from 'axios';
import { AxiosUtils } from '../../utils/axios.utils';
import { CancelablePromise, OpenAPI } from "../openapi";

export class VideoDownloadService {
  /**
   * @param url
   * @param container
   * @param onDownloadProgress
   * @returns Downloaded file
   */
  public static getYoutubeVideoDownload(
    url: string,
    container: string | undefined = undefined,
    onDownloadProgress: (progressEvent: AxiosProgressEvent) => void
  ): CancelablePromise<File> {
    return new CancelablePromise(async (resolve, reject, onCancel) => {
      try {
        if (!onCancel.isCancelled) {
          // Create cancellation handler and token
          const cancellationHandler = axios.CancelToken.source();
          onCancel(() => cancellationHandler.cancel('Cancellation requested'));
          // Await response with cancellation token
          const response = await axios.get(`/youtube/video/download`, {
            baseURL: OpenAPI.BASE,
            headers: AxiosUtils.getAuthHeader(),
            params: { url, container },
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
