import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import env from '../../utils/const.js';

const logger = createLogger({
  collapsed: true,
});

const middlewares = [thunkMiddleware];

if (env === 'development') {
  middlewares.push(logger);
}

export default middlewares;