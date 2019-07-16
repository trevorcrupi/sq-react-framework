import LowDriver from './custom/drivers/LowDriver';
import WorkerDriver from './custom/drivers/WorkerDriver';

// Custom
import OMDBDriver from './custom/drivers/OMDBDriver';
import AuthDriver from './custom/drivers/AuthDriver';

const drivers = {
    local: new LowDriver(),
    worker: new WorkerDriver(),
    omdb: new OMDBDriver(),
    auth: new AuthDriver()
};

export default drivers;
