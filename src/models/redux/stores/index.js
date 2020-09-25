import { applyMiddleware, compose, createStore } from 'redux';
import middlewares from '../middle-wares/index.js';
import rootReducer from '../reducers/index.js';
import initialState from '../initial-state/index.js';

function configureStore(initialState) {
  const middlewareEnhancer = applyMiddleware(...middlewares);
  const enhancers = [middlewareEnhancer];
  const composedEnhancers = compose(...enhancers);
  const store = createStore(rootReducer, initialState, composedEnhancers);

  return store;
}

export default configureStore(initialState);