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
          name: ['string', auth.name],
          timestamps: ['generate:timestamps', auth.timestamps]
        }
      });
    }

    /*
      Check if user is already stored before creating to save some time.
    */
    async create() {
      try {
        const read = await this.getDriver().read({ table: 'auth' });

        if(!read.oid || read.oid !== this.oid) {
          return super.create({
            table: 'auth',
            insert: {
              oid: this.oid,
              userName: this.userName,
              name: this.name,
              timestamps: this.timestamps
            }
          });
        }

        return this.read({
          table: 'auth',
          readData: read
        });
      } catch(err) {
        throw new Error(err);
      }
    }

    async logout() {
      try {
        // await this.delete({ table: 'auth' });
        this.getDriver('auth').logout();
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
