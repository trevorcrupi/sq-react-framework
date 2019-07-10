import isEqual from 'lodash/isEqual';

export default class Hydrator {

    hydrate(schema, newData) {
        if(!isEqual(schema, newData)) {
            for(let key in schema.schema) {
                // Make sure types are okay.
                if(schema.checkType(schema.maps.types[key], newData[key])) {
                    schema.maps.storage[key] = newData[key];
                } else {
                    console.log(`ERROR: Types do not match for ${schema.model} model at key ${key}`);
                }
            }
        }

        return schema;
    }
}