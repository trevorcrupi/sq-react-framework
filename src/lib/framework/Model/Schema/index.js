import { isArray, isNumber, isString, isObject, isBoolean } from 'lib/framework/helpers/is'; 
import uuid from 'uuidv4';

export default class Schema {
    constructor(model, schema) {
        this.generated = {};
        this.types = {
            dynamic: 0,
            string: 1,
            number: 2,
            array: 3,
            object: 4,
            boolean: 5,
            model: 6,
            collection: 7,
            uuid: 8,
            timestamps: 9
        };
        this.model     = model;
        this.schema    = this.validate(schema);
        this.maps      = this.init(this.schema);
    }

    /*
        Makes sure the schema is set up correct, with arrays of length 2 and a string in the first spot.
    */
    validate(schema) {
        for(let key in schema) {
            if(!isArray(schema[key])) {
                throw new Error(`FatalError: Schema for model ${this.model} is invalid. You must use an array when defining schemas.`);
            }

            if(schema[key].length !== 2) {
                throw new Error(`FatalError: Schema for model ${this.model} is invalid. Your array must have a length of 2.`);
            }

            if(!isString(schema[key][0])) {
                throw new Error(`FatalError: Schema for model ${this.model} is invalid. The first element in your array must be a string.`);
            }
        }

        return schema;
    }

    /*
        Initializes key value map and types map, check initial values (if they exist!)
    */
    init(schema) {
        let schemaMap = {};
        schemaMap.types   = this.createKeyTypeMap(schema);
        schemaMap.storage = this.createKeyValueMap(schema);

        for(let key in schema) {
            if(schema[key] !== undefined) {
                if(!this.checkType(schemaMap.types[key], schemaMap.storage[key])) {
                    console.log(`ERROR: Types do not match for ${this.model} model at key ${key}`);
                }
            }
        }

        return schemaMap;
    }

   /*
        Sets up in memory storage to match keys to their types
   */
    createKeyTypeMap(schema) {
        let types = {};
        for(let key in schema) {
            const typeArray = schema[key][0].split(':');
            if(typeArray[0] !== 'generate') {
                types[key] = schema[key][0];
            } else {
                types[key] = typeArray[1];
                this.generated[key] = typeArray[1];
            }
            
        }
        return types;       
    }

    /*
        Sets up in memory storage for actual values, i.e. { key1: modelValue1, key2: modelValue2, ... } for faster searching.
    */
    createKeyValueMap(schema) {
        let storage = {};
        for(let key in schema) {
            let val = '';
            if(this.generated[key] !== undefined && schema[key][1] === undefined) {
                val = this.generate(key);
            } else {
                val = schema[key][1]
            }
            storage[key] = val;
        }

        return storage;
    }


   /*
        Make sure values are appropriate types IF VALUE EXISTS
   */
    checkType(type, value) {
        if(!value) {
            return true; 
        }

        if(this.types[type] === 0) {
            return true;
        }

        if(this.types[type] === 1) {
            return isString(value);
        }

        if(this.types[type] === 2) {
            return isNumber(value);
        }

        if(this.types[type] === 3) {
            return isArray(value);
        }

        if(this.types[type] === 4) {
            return isObject(value);
        }

        if(this.types[type] === 5) {
            return isBoolean(value);
        }

        if(this.types[type] === 8) {
            return true;
        }

        if(this.types[type] === 9) {
            return true;
        }

        if(type[0] === type[0].toUpperCase()) {
            return typeof value === 'object' && value.constructor.name === type;
        }

        throw new Error(`FatalError: ${type} is not a supported schema type. Try using dynamic, or check the docs for more info.`);
    }

    /*
        Generates values automatically
    */
    generate(key) {
        if(this.generated[key] === 'uuid') {
            return uuid();
        }

        if(this.generated[key] === 'timestamps') {
            return {
                updated_at: Date.now(),
                created_at: Date.now()
            };
        }

        throw new Error(`FatalError: ${key} is not supported for automatic generation. Check the docs for more info.`);
    }
}