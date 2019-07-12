// My attempt at a javascript interface

export default class Driver {

    create() {
        this.throw('create()');
    }

    read() {
        this.throw('read()');
    }

    update() {
        this.throw('update()');
    }

    delete() {
        this.throw('delete()');
    }

    all() {
        this.throw('all()');
    }

    throw(functionName) {
        throw new Error(`FatalError: You are seeing this because you tried to call ${functionName} on a model without having defined a ${functionName} function in your driver (maybe there's a typo?). See the docs for more info.`);
    }

}