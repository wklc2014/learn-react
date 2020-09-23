export default {
    name: 'car',
    state: {
        age: 34,
        url: 'http://www.baidu.com',
        app: 'chrome',
    },
    reducers: {
        changeApp(state, { payload }) {
            return {
                ...state,
                app: payload,
            }
        }
    },
    effects: {},
}
