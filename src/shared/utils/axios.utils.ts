import { AxiosResponse } from 'axios';
import { RegexConstants } from '../constants/regex.constants';

export const AxiosUtils = {
  getFilenameFromHeaders(response: AxiosResponse): string {
    const contentDisposition = response.headers['content-disposition'];
    if (!contentDisposition) return '';
    const [, , filename] =
      RegexConstants.AXIOS.CONTENT_DISPOSITION_HEADER.exec(
        contentDisposition
      ) ?? [];
    return filename;
  },
};
