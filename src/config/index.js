import { adalApiFetch } from './adal';
import { drivers } from './drivers';

const apiUri = path => {
  return process.env.REACT_APP_API_URI + path;
};

export { apiUri, adalApiFetch, drivers };
