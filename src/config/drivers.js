import EngageDriver from './custom/drivers/EngageDriver';
import LowDriver from './custom/drivers/LowDriver';
import WorkerDriver from './custom/drivers/WorkerDriver';

const drivers = {
    engage: new EngageDriver(),
    local: new LowDriver(),
    worker: new WorkerDriver(),
};

export default drivers;