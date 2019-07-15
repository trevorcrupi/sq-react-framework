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
        // If it exists in the workers table, this means it has happened already.
        // Thus, if we don't want this worker to run everytime, we just return the payload.
        if(!payload.every && this.exists(payload.action)) {
          return payload;
        }

        // Add to the queue table
        this.db.get('queue').push({
            id: payload.id,
            workerModel: payload.workerModel,
            priority: payload.priority || 0,
            action: payload.action,
            timestamp: payload.timestamps.created_at
        }).write();

        // Add to worker table if doesn't exist
        if(!this.exists(payload.action)) {
            this.db.get('workers').push({
                id: payload.id,
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
    exists(action) {
        if(!this.db.get('workers').find({ action }).value()) {
            return false;
        }

        return true;
    }

    /*
        Get items from the worker queue
    */
    all() {
      return this.db.get('worker_queue').value();
    }

    read() {}

    readFromQueue() {}

    readFromWorkers() {}
}
