import Mirror from '@components/mirror/index.js';
import userModel from '@/models/user.js';
import carModel from '@/models/car.js';
import loadingPlugin from '@/components/mirror/plugins/loading.js';

const mirror = new Mirror();
mirror.model(userModel);
mirror.model(carModel);
mirror.install(loadingPlugin, {});

const middlewares = []
if (process.env.NODE_ENV !== 'production') {
    const { createLogger } = require('redux-logger');
    const logMiddleware = createLogger({ collapsed: true });
    middlewares.push(logMiddleware);
}
const store = mirror.createStore(middlewares);

export default mirror;
