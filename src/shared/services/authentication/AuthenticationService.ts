import { AuthRequest, AuthResponse, OpenAPI } from '../openapi';
import { AxiosUtils } from '../../utils/axios.utils';

export class AuthenticationService {
  static async authenticate(body: AuthRequest): Promise<AuthResponse> {
    const instance = AxiosUtils.getJsonAxiosInstance(OpenAPI.BASE);
    const result = await instance.post<AuthResponse>('/auth/login', body);
    return result.data;
  }
}
