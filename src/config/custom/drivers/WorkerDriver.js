import { Driver } from 'lib/framework/Driver';
import low from 'lowdb'
import LocalStorage from 'lowdb/adapters/LocalStorage'

export default class WorkerDriver extends Driver {
    constructor() {
        super();
        const adapter = new LocalStorage('worker_queue');
        this.db = low(adapter)
        this.db.defaults({ queue: [], workers: [] }).write();
    }

    create(payload) {
        console.log(payload);
        // Add to queue table
        this.db.get('queue').push({
            id: payload.id,
            workerCallback: payload.workerCallback,
            workerModel: payload.workerModel,
            priority: payload.priority || 0,
            action: payload.action,
            timestamp: payload.timestamps.created_at
        }).write();

        // Add to worker table if doesn't exist
        if(!this.exists(payload.id)) {
            this.db.get('workers').push({
                id: payload.id,
                workerCallback: payload.workerCallback,
                workerModel: payload.workerModel,
                priority: payload.priority || 0,
                action: payload.action,
                timestamps: payload.timestamps
            }).write();
        }

        return payload; 
    }

    /*
        Check if worker already exists in the worker table, if not, create it!
    */
    exists(id) {
        if(!this.db.get('workers').find({ id }).value()) {
            return false;
        }

        return true;
    }

    read() {}

    readFromQueue() {}

    readFromWorkers() {}
}