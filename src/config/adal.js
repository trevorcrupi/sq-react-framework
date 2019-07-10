import { AuthenticationContext, adalFetch, withAdalLogin } from 'react-adal';

export const adal = {
  tenant: process.env.REACT_APP_TENANT,
  clientId: process.env.REACT_APP_CLIENT_ID,
  endpoints: {
    api: process.env.REACT_APP_CLIENT_ID
  },
  redirectUri: process.env.REACT_APP_REDIRECT_URI,
  cacheLocation: 'sessionStorage'
};

export const authContext = new AuthenticationContext(adal);

export const adalApiFetch = (fetch, url, options) => adalFetch(authContext, adal.endpoints.api, fetch, url, options);

export const withAdalLoginApi = withAdalLogin(authContext, adal.endpoints.api);

export const getToken = () => {
  return authContext.getCachedToken(authContext.config.clientId);
};
