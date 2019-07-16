import ActionGenerator from 'lib/framework/ActionGenerator';
import Schema from './Schema';
import Hydrator from './Hydrator';

// Import Drivers and Plugins from config
import drivers from 'config/drivers';
// import plugins from 'config/plugins';

export default class Model {

    constructor(model) {
        this.model = {};
        this.model.name   = model.model;
        this.model.driver = model.driver;
        this.model.schema = new Schema(this.model.name, model.schema);

        // Initialize model
        this.set();
    }

    async create(payload) {
        try {
            const { cargo } = this.prepare(payload);

            if(!cargo.insert) {
              cargo.insert = this.attachInsertionPayload();
            }

            const createData = await drivers[this.model.driver].create(cargo);

            if(createData) {
                this.hydrate(createData).set();
            }

            // model.Movie.create
            return new ActionGenerator({
                type: ['model', this.model.name, this.create.name],
                value: this
            }).ready();
        } catch(err) {
            throw new Error(err);
        }
    }

    async read(payload) {
        try {
            let readData = payload.readData;
            const { cargo } = this.prepare(payload);

            if(!payload.readData) {
              readData = await drivers[this.model.driver].read(cargo);
            }

            if(readData) {
                this.hydrate(readData).set();
            }

            return new ActionGenerator({
                type: ['model', this.model.name, this.read.name],
                value: this
            }).ready();
        } catch(err) {
            throw new Error(err);
        }
    }

    async update(payload) {
        try {
            const { cargo } = this.prepare(payload);
            const updateData = await drivers[this.model.driver].update(cargo);
            if(updateData) {
                this.hydrate(updateData).set();
            }

            return new ActionGenerator({
                type: ['model', this.model.name, this.update.name],
                value: this
            }).ready();
        } catch(err) {
            throw new Error(err);
        }
    }

    async delete(payload) {
        try {
            const { cargo } = this.prepare(payload);
            await drivers[this.model.driver].delete(cargo);

            return new ActionGenerator({
                type: ['model', this.model.name, this.update.name],
                value: { deleted: true }
            }).ready();
        } catch(err) {
            throw new Error(err);
        }
    }

    // Sinks direct changes to model with schema map and dispatches a new read action to update the store.
    sync() {
        const schema = new Hydrator().sync(this, this.model.schema);
        this.model.schema = schema;
        return new ActionGenerator({
            type: ['model', this.model.name, 'read'],
            value: this
        });
    }

    // Eventually do other checking in here
    prepare(payload) {
        let callback = '';
        let plugins = [];
        this.worker = {
            callback,
            plugins
        };

        if(payload.callback) {
            this.worker.callback = payload.callback;
            callback = this.worker.callback;
            delete payload.callback;
        }

        if(payload.plugins) {
            this.worker.plugins = payload.plugins;
            plugins = this.worker.plugins;
            delete payload.plugins;
        }

        return {
            cargo: payload,
        };
    }

    /*
        Gets a driver. Returns default driver if nothing is given.
    */
    getDriver(driver) {
        if(!driver) {
            return drivers[this.model.driver];
        }

        if(drivers[driver]) {
          return drivers[driver];
        }

        throw new Error(`Driver ${driver} does not exist.`);
    }

    /*
        Calls the hydrator to update the schema. The only purpose of this function is to clean up
    */
    hydrate(newData) {
        this.model.schema = new Hydrator().hydrate(this.model.schema, newData);
        return this;
    }

    /*
        Automatically sets values from schema as class values
    */
    set() {
        for(let key in this.model.schema.maps.storage) {
            if(this.model.schema.maps.storage.hasOwnProperty(key)) {
                this[key] = this.model.schema.maps.storage[key];
            }
        }
    }

    /*
      Automatically attach current object attributes if nothing is given for insert
    */
    attachInsertionPayload() {
      let insert = {};
      for(let key in this) {
        if(key !== 'model' && key !== 'worker') {
          insert[key] = this[key];
        }
      }

      return insert;
    }
}
