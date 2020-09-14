import initStates from './initStates.js';
import actionTypes from './actionTypes.js';

export default function reducer(state = initStates, action) {
    switch (action.type) {
        case actionTypes.increase:
            return {
                ...state,
                count: state.count + action.payload,
            }
            break;
        case actionTypes.decrease:
            return {
                ...state,
                count: state.count - action.payload,
            }
            break;
        default:
            return state;
            break;
    }
}
