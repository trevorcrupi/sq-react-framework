import { Collection } from 'lib/framework/Collection';

export default class DynamicWorkerQueueCollection extends Collection {
  constructor(workerQueueCollection) {
    super({
      collection: 'DynamicWorkerQueueCollection',
      model: 'DynamicWorkerQueue',
      driver: 'worker',
      posts: workerQueueCollection,
    });
  }
}
