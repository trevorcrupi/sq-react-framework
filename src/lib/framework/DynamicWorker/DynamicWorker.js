import Model from '../Model';

export default class DynamicWorker extends Model {
    constructor(worker) {
        super({
            model: 'Worker',
            driver: 'worker',
            schema: {
                id: ['generate:uuid', worker.id],
                workerCallback: ['function', worker.workerCallback],
                plugins: ['array', worker.plugins],
                workerModel: ['dynamic', worker.workerModel],
                action: ['string', worker.action],
                priority: ['number', worker.priority],
                timestamps: ['generate:timestamps', worker.timestamps]
            }
        });
    }

    create() {
        return super.create({
            workerCallback: this.workerCallback,
            plugins: this.plugins,
            workerModel: this.workerModel,
            priority: 0,
            timestamps: this.timestamps             
        });
    }
}