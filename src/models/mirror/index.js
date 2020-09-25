import HModel from '@components/hmodel/index.js';
import HModelLoading from '@/components/hmodel/plugins/loading.js';
import userModel from '@/models/mirror/user.js';
import carModel from '@/models/mirror/car.js';

const middlewares = []
if (process.env.NODE_ENV !== 'production') {
    const { createLogger } = require('redux-logger');
    const logMiddleware = createLogger({ collapsed: true });
    middlewares.push(logMiddleware);
}

const hmodel = new HModel();
hmodel.model(userModel);
hmodel.model(carModel);
hmodel.use(HModelLoading);
hmodel.createStore(middlewares);

export default hmodel;
