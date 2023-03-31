import './App.scss';
import React, { useContext, useEffect } from 'react';
import Layout from './components/Layout';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';
import {
  AuthenticationContext,
  AuthenticationDispatchContext
} from './shared/contexts/authentication/AuthenticationContext';
import { AxiosUtils } from './shared/utils/axios.utils';

function App() {
  // Redirect to login page if not authenticated
  const { authenticated } = useContext(AuthenticationContext);
  useEffect(() => {
    if (!authenticated) router.navigate('/login');
  }, [authenticated]);

  // Add axios interceptor on application launch
  const dispatchAuthenticationAction = useContext(AuthenticationDispatchContext);
  useEffect(() => AxiosUtils.addInterceptor(dispatchAuthenticationAction), []);
  // Render application
  return (
    <Layout>
      <RouterProvider router={router}></RouterProvider>
    </Layout>
  );
}

export default App;
