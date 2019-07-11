import ActionGenerator from './ActionGenerator';
import Schema from './Schema';
import Hydrator from './Hydrator';

// Import Drivers and Plugins from config
import drivers from 'config/drivers';
// import plugins from 'config/plugins';

export default class Model {

    constructor(model) {
        this.model = {};
        this.model.name   = model.model;
        this.model.driver = drivers[model.driver];
        this.model.schema = new Schema(this.model.name, model.schema);
        // Initialize model
        this.set();
    }

    create(payload) {
        try {
            const { cargo, callback } = this.prepare(payload);
            const createData = this.model.driver.create(cargo);
            if(createData) {
                this.hydrate(createData).set();
            }

            if(callback) {
                //const plugins = plugins || [];
                console.log('We have a worker!');
                console.log('We have plugins!');
            }

            return new ActionGenerator({
                type: ['model', this.model.name, this.create.name],
                value: this
            }).ready();
        } catch(err) {
            throw new Error(err);
        }
    }

    read(payload) {
        try {
            const { cargo, callback } = this.prepare(payload);
            const readData = this.model.driver.read(cargo);
            if(readData) {
                this.hydrate(readData).set();
            }

            if(callback) {
                //const plugins = plugins || [];
                console.log('We have a worker!');
                console.log('We have plugins!');
            }

            return new ActionGenerator({
                type: ['model', this.model.name, this.read.name],
                value: this
            }).ready();
        } catch(err) {
            throw new Error(err);
        }
    }

    update(payload) {
        try {
            const { cargo } = this.prepare(payload);
            const updateData = this.model.driver.update(cargo);
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

    delete(payload) {
        try {
            const { cargo } = this.prepare(payload);
            this.model.driver.delete(cargo);

            return new ActionGenerator({
                type: ['model', this.model.name, this.update.name],
                value: { deleted: true }
            }).ready();
        } catch(err) {
            throw new Error(err);
        }
    }

    // Eventually do other checking in here
    prepare(payload) {
        let callback = '';
        let plugins = [];

        if(payload.callback) {
            callback = payload.callback;
            delete payload.callback;
        }

        if(payload.plugins) {
            plugins = payload.plugins;
            delete payload.plugins;
        }

        return {
            cargo: payload,
            callback,
            plugins
        };
    }

    /*
        Gets a driver. Returns default driver if nothing is given.
    */
    getDriver(driver) {
        if(!driver) {
            return this.model.driver;
        }

        return drivers[driver];
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
            this[key] = this.model.schema.maps.storage[key];
        }
    }

}
