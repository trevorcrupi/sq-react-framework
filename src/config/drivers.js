import EngageDriver from './custom/drivers/EngageDriver';
import LowDriver from './custom/drivers/LowDriver';

const drivers = {
    engage: new EngageDriver(),
    local: new LowDriver()
};

export default drivers;