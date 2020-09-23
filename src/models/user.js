import mirror from '@components/mirror/index.js';
import { zmCustormCard } from '@utils/services.js';

export default {
    name: 'user',
    state: {
        phone: '13591993996',
        address: '河南郑州',
        email: '373658358@qq.com',
        count: 24,
    },
    reducers: {
        updateUser(state, { payload }) {
            return {
                ...state,
                ...payload,
            }
        },
        addCount(state, { payload }) {
            return {
                ...state,
                count: state.count + payload,
            }
        }
    },
    effects: {
        async fetch({ payload }, { getState, dispatch }) {
            const data = await zmCustormCard(payload);
            console.log('data>>>', data);
            dispatch({ type: 'car/changeApp', payload: data });
        },
    },
}
