import { Driver } from 'lib/framework/Driver';
import { authContext } from 'config/adal';

export default class AuthDriver extends Driver {
   async logout() {
    try {
      return authContext.logOut();
    } catch(err) {
      throw new Error(err);
    }
  }
}
