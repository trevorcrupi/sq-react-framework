import Model from 'lib/framework/Model';
import ActionGenerator from 'lib/framework/ActionGenerator';

export default class Auth extends Model {
    constructor(auth) {
      super({
        model: 'Auth',
        driver: 'local',
        schema: {
          oid: ['string', auth.oid],
          userName: ['string', auth.userName],
          name: ['string', auth.name]
        }
      });
    }

    async logout() {
      try {
        await this.delete({ table: 'auth' });
        const logout = this.getDriver('auth').logout();
        console.log(logout);
        return new ActionGenerator({
          type: ['model', 'Auth', 'delete'],
          value: { deleted: true }
        }).ready();
      } catch(err) {
        throw new Error(err);
      }
    }

    get(value) {
      return this[value] ? this[value] : '...';
    }
}
