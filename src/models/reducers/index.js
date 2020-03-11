import { combineReducers } from 'redux';
import reducer_example from './reducer-example.js';

const rootReducer = combineReducers({
    _example: reducer_example,
});

export default rootReducer;