import { createBrowserRouter } from 'react-router-dom';
import YoutubeSteps from '../module-youtube/components/YoutubeSteps';
import AuthPage from '../module-auth/containers/AuthPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <YoutubeSteps />
  },
  {
    path: '/login',
    element: <AuthPage />
  }
]);
