import { isArray } from 'lib/framework/helpers/is'; 

export default class ActionGenerator {

    constructor(action) {
        this.type = action.type;
        this.value = action.value;
    }

    ready() {
        let type = this.type;
        if(isArray(this.type)) {
            type = this.type.join('.');
        }
        
        console.log();
        return {
            type,
            value: this.value
        };
    }
}