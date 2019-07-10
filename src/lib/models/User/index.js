import Model from 'lib/framework/Model';
import ActionGenerator from 'lib/framework/Model/ActionGenerator';

export default class User extends Model {

    constructor(user) {
        super({
            model: 'User',
            driver: 'local',
            schema: {
                id: ['generate:uuid', user.id],
                email: ['string', user.email],
                name: ['string', user.name]
            }
        });
    }

    create(callback, plugins) {
        return super.create({
            table: 'user',
            insert: {
                id: this.id,
                email: this.email,
                name: this.name
            },  
            callback,
            plugins
        });
    }

    getName() {
        return this.name ? this.name : '...';
    }

    getEmail() {
        return this.email ? this.email : '...';
    }
}