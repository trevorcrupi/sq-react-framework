import ActionGenerator from 'lib/framework/ActionGenerator';
import drivers from 'config/drivers';
import { isArray } from 'lib/framework/helpers/is';
import { lowercaseFirst } from 'lib/framework/helpers/strings';
import pluralize from 'pluralize';

export default class Collection {
    constructor(collection) {
        this.collection = {};
        this.collection.name = collection.collection;
        this.collection.model = collection.model;
        this.collection.driver = collection.driver;
        this.collection.plural = collection.plural;
    }

    fill(Model) {
        try {
            let fills = [];
            const collectionData = drivers[this.collection.driver].all();
            if(collectionData) {
                if(!isArray(collectionData)) {
                    throw new Error(`FatalError: Your all() method in your driver MUST return an array. Define your own fill() method in your collection if this is unacceptable.`);
                }

                for(let i = 0; i < collectionData.length; i++) {
                    fills.push(new Model(collectionData[i]));
                }
            }
            if(!pluralize.isPlural(this.collection.model)) {
                let pluralForm = this.collection.plural ? this.collection.plural : pluralize.plural(this.collection.model);
                pluralForm = lowercaseFirst(pluralForm);
                this[pluralForm] = fills;
            }
            
            return new ActionGenerator({
                type: ['model', this.collection.name, 'read'],
                value: this
            }).ready();
        } catch(err) {
            throw new Error(err);
        }        
    }
}