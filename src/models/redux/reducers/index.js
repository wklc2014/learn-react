import { combineReducers } from 'redux';
import reducer_example from './reducer-example.js';

const rootReducer = combineReducers({
    user: reducer_example,
});

export default rootReducer;
