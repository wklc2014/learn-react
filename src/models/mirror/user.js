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
        update(state, { payload }) {
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
            // dispatch({
            //     type: 'loading/show',
            //     payload: { namespace: 'user', action: 'effects/fetch' }
            // });
            dispatch({ type: 'car/update', payload: { app: 'IE' } });
            const data = '绵阳';
            // const data = await zmCustormCard(payload);
            // console.log('data>>>', data);
            dispatch({ type: 'user/update', payload: { address: data } });
        },
    },
}
