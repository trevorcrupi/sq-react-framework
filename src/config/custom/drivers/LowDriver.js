import { Driver } from 'lib/framework/Driver';
import low from 'lowdb'
import LocalStorage from 'lowdb/adapters/LocalStorage'

export default class LowDriver extends Driver {

    constructor() {
        super();
        const adapter = new LocalStorage('db')
        this.db = low(adapter)
        this.db.defaults({ init: [], movies: [], auth: {} }).write();
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
    async create(payload) {
        if(!payload.table) {
            throw new Error('No table specified in payload.');
        }

        if(payload.table === 'auth') {
            return this.setObjectTable(payload.table, payload.insert);
        }

        this.db.get(payload.table).push(payload.insert).write();
        return payload.insert;
    }

    /*
    {
        table: 'posts',
        query: {
            authId: 1
        }
    }
    */
    async read(payload) {
        if(!payload.table) {
            throw new Error('No table specified in payload');
        }

        if(payload.table === 'auth') {
            return this.db.get(payload.table).value();
        }

        return this.db.get(payload.table).find(payload.query).value();
    }

    /*
    {
        table: 'posts',
        query: {
            id: 'some-uuid-or-whatever'
        },
        update: {
            title: 'brand new title'
        }
    }
    */
    async update(payload) {
        if(!payload.table) {
            throw new Error('No table specified in payload');
        }

        if(payload.table === 'auth') {
            return this.db.set(payload.table + '.' + payload.query, payload.update).value();
        }

        this.db.get(payload.table).find(payload.query).assign(payload.update).write();
        return this.db.get(payload.table).find(payload.query).value();
    }

    /*
    {
        table: 'posts',
        delete: {
            title: 'brand new title'
        }
    }
    */
    async delete(payload) {
        if(!payload.table) {
            throw new Error('No table specified in payload');
        }

        if(payload.table === 'auth') {
            return this.db.set('auth', {}).write();
        }

        return this.db.get(payload.table).remove(payload.delete).write();
    }

    async all() {
        return this.db.get('posts').value();
    }

    setObjectTable(table, insert) {
        this.db.set(table, insert).write();
        return insert;
    }
}
