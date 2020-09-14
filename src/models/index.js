import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import counter from './counter';

const rootReducer = combineReducers({
    counter,
});

const loggerMiddleware = createLogger({
    collapsed: true,
});

function configureStore(initialState) {
    const middlewares = [thunkMiddleware];

    if (process.env.NODE_ENV === 'development') {
        middlewares.push(loggerMiddleware);
    }

    const middlewareEnhancer = applyMiddleware(...middlewares);
    const enhancers = [middlewareEnhancer];
    const composedEnhancers = compose(...enhancers);
    const store = createStore(rootReducer, initialState, composedEnhancers);

    return store;
}

export default configureStore;
