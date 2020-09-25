export default {
    name: 'car',
    state: {
        age: 34,
        url: 'http://www.baidu.com',
        app: 'chrome',
    },
    reducers: {
        update(state, { payload }) {
            console.log('arguments>>>', arguments);
            return {
                ...state,
                ...payload,
            }
        }
    },
    effects: {},
}
