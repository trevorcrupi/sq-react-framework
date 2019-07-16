import { AuthenticationContext, adalFetch, withAdalLogin } from 'react-adal';

export const adalConfig = {
  tenant: process.env.REACT_APP_TENANT,
  clientId: process.env.REACT_APP_CLIENT_ID,
  endpoints: {
    api: process.env.REACT_APP_CLIENT_ID,
  },
  redirectUri: process.env.REACT_APP_REDIRECT_URI,
  cacheLocation: 'sessionStorage',
}

export const authContext = new AuthenticationContext(adalConfig);

export const adalApiFetch = (fetch, url, options) =>
  adalFetch(authContext, adalConfig.endpoints.api, fetch, url, options);

export const withAdalLoginApi = withAdalLogin(authContext, adalConfig.endpoints.api);

export const getToken = () => {
  return authContext.getCachedToken(authContext.config.clientId);
};
