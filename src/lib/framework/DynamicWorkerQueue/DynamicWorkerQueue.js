import Model from '../Model';

export default class DynamicWorkerQueue extends Model {
    constructor(worker) {
        super({
            model: 'DynamicWorkerQueue',
            driver: 'worker',
            schema: {
                id: ['generate:uuid', worker.id],
                workerCallback: ['function', worker.workerCallback],
                plugins: ['array', worker.plugins],
                workerModel: ['dynamic', worker.workerModel],
                action: ['string', worker.action],
                every: ['boolean', worker.every],
                priority: ['number', worker.priority],
                timestamps: ['generate:timestamps', worker.timestamps],
            }
        });
    }

    create() {
        return super.create({
            id: this.id,
            workerCallback: this.workerCallback,
            plugins: this.plugins,
            workerModel: this.workerModel,
            action: this.action,
            every: this.every,
            priority: 0,
            timestamps: this.timestamps
        });
    }
}
