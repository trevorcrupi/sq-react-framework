import isEqual from 'lodash/isEqual';

export default class Hydrator {

    hydrate(schema, newData) {
        if(!isEqual(schema, newData)) {
            for(let key in schema.schema) {
                /* If there's a value in the schema but not in the newData, don't overwrite it...
                if(schema.maps.storage[key] !== undefined && !newData[key]) {
                  newData[key] = schema.maps.storage[key];
                }
                */
                // Make sure types are okay.
                if(schema.checkType(schema.maps.types[key], newData[key])) {
                    schema.maps.storage[key] = newData[key];
                } else {
                    schema.maps.storage[key] = newData[key];
                    console.log(`ERROR: Types do not match for ${schema.model} model at key ${key}`);
                }
            }
        }

        return schema;
    }

    sync(model, schema) {
        let sync = {};
        for(let key in model) {
            if (model.hasOwnProperty(key) && model.model.schema.maps.storage.hasOwnProperty(key)) {
                if(model[key] !== model.model.schema.maps.storage[key]) {
                    schema.maps.storage[key] = model[key];
                }
                sync[key] = model[key];
            }
        }

        return schema
    }
}
