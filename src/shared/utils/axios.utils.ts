import axios, { Axios, AxiosResponse } from 'axios';
import { RegexConstants } from '../constants/regex.constants';
import { Dispatch } from 'react';
import { AuthenticationAction, AuthenticationActionType } from '../contexts/authentication/AuthenticationActions';
import { AuthenticationStorage } from '../storage/authentication/AuthenticationStorage';
import { OpenAPI } from '../services/openapi';
import { AuthenticationService } from '../services/authentication/AuthenticationService';

export const AxiosUtils = {
  getJsonAxiosInstance(baseUrl: string) {
    return axios.create({
      baseURL: baseUrl,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      // Transform the request data to JSON string
      transformRequest: [(data) => JSON.stringify(data)],
      transformResponse: [
        (data) => {
          // Parse the response data from JSON string to JavaScript object
          try {
            return JSON.parse(data);
          } catch (error) {
            return data;
          }
        },
      ],
    });
  },
  getFilenameFromHeaders(response: AxiosResponse): string {
    const contentDisposition = response.headers['content-disposition'];
    if (!contentDisposition) return '';
    const [, filename, utfFileName] = RegexConstants.AXIOS.CONTENT_DISPOSITION_HEADER.exec(contentDisposition) ?? [];
    return utfFileName ? decodeURI(utfFileName) : filename;
  },
  getAuthHeader() {
    const jwtToken = AuthenticationStorage.getJwtToken()!;
    if (jwtToken) {
      return { Authorization: 'Bearer ' + jwtToken };
    } else {
      return {};
    }
  },

  addInterceptor(dispatch: Dispatch<AuthenticationAction>): void {
    // Add axios redirect on 401
    axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        // Check if the response is a 401 Unauthorized error
        if (error.response?.status === 401) {
          // Attempt to re-authenticate using an API key
          let apiKey = AuthenticationStorage.getAPIKey();
          let jwtToken: string | null | undefined;
          try {
            // Validate
            if (!apiKey) throw new Error('No api key found');
            // Get new jwt token and validate. Use new instance to not use this interceptor
            const instance = new Axios({ baseURL: OpenAPI.BASE });
            ({ jwtToken } = await AuthenticationService.authenticate({ apiToken: apiKey }));
            if (!jwtToken) throw new Error('No jwt token received');
          } catch (e) {
            // Log the user out if re-authentication fails
            dispatch({ type: AuthenticationActionType.LOGOUT });
            return Promise.reject();
          }

          // Re-authenticate using renewed jwt token
          dispatch({ type: AuthenticationActionType.AUTHENTICATE, apiKey, jwtToken });

          // Update the original request with the new JWT token
          originalRequest.headers.Authorization = `Bearer ${jwtToken}`;
          return axios(originalRequest);
        }

        // Return the error if it's not a 401 Unauthorized error
        return Promise.reject(error);
      }
    );
  },
};
