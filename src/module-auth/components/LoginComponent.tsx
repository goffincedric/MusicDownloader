import LoginForm from './forms/LoginForm';
import { useContext, useState } from 'react';
import { router } from '../../router/router';
import { AuthenticationDispatchContext } from '../../shared/contexts/authentication/AuthenticationContext';
import { AuthenticationActionType } from '../../shared/contexts/authentication/AuthenticationActions';
import { AuthenticationService } from '../../shared/services/authentication/AuthenticationService';

export function LoginComponent() {
  const dispatchAuthenticationAction = useContext(AuthenticationDispatchContext);
  const [loading, setLoading] = useState(false);
  const handleLogin = async (apiToken: string) => {
    setLoading(true);
    try {
      // Get jwt token
      const response = await AuthenticationService.authenticate({ apiToken: apiToken });
      // Check if jwt token is present
      if (!response.jwtToken) return; // TODO: Show error toast

      // Save api token and jwt token
      dispatchAuthenticationAction({
        type: AuthenticationActionType.AUTHENTICATE,
        apiKey: apiToken,
        jwtToken: response.jwtToken,
      });
      // Redirect to home page on success
      await router.navigate('/');
    } catch (_) {
      // TODO: Show error toast
      console.log(_);
    } finally {
      setLoading(false);
    }
  };
  return <LoginForm onSubmit={(jwtToken) => handleLogin(jwtToken)} loading={loading} />;
}
