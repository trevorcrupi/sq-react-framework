import low from 'lowdb'
import LocalStorage from 'lowdb/adapters/LocalStorage'

export default class LowDriver {

    constructor() {
        const adapter = new LocalStorage('db')
        this.db = low(adapter)
        this.db.defaults({ user: {}, posts: []}).write();
    }

    /*
        {
            table: 'posts',
            create: {
                id: 1,
                title: 'New Post',
                text: 'New post text'
            }
        }
    */
    create(payload) {
        if(!payload.table) {
            throw new Error('No table specified in payload.');
        }

        if(!payload.insert.id) {
            throw new Error('No id specified in payload');
        }

        if(payload.table === 'user') {
            return this.setObjectTable(payload.table, payload.insert);
        }

        this.db.get(payload.table).push(payload.insert).write();
        return payload.insert; 
    }

    /*
    {
        table: 'posts',
        query: {
            userId: 1
        }
    }
    */
    read(payload) {
        if(!payload.table) {
            throw new Error('No table specified in payload');
        }

        if(payload.table === 'user') {
            return this.db.get(payload.table).value();
        }

        return this.db.get(payload.table).find(payload.query).value();
    }

    getAllPosts() {
        return this.db.get('posts').value();
    }

    setObjectTable(table, insert) {
        this.db.set(table, insert).write();
        return insert;
    }
}