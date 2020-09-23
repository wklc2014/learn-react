function createModel(configs) {

    const createReducer = (loading) => (state, { payload }) => {
        const { namespace, action } = payload;
        const newState = Object.assign({}, state, {
            global: loading,
            models: {
                ...state.models,
                [namespace]: loading,
            },
        });
        if (configs.effects) {
            newState.effects = Object.assign({}, state.effects, {
                [`${namespace}/${action}`]: loading,
            });
        }
        return newState;
    }

    return {
        name: configs.name,
        state: {
            global: false,
            models: {},
        },
        reducers: {
            show: createReducer(true),
            hide: createReducer(false),
        }
    }
}

function createActions(mirror, configs) {
    Object.keys(mirror.actions).forEach(namespace => {
        if (namespace === configs.name) { return }
        const modelActions = mirror.actions[namespace];
        // map over effects within models
        Object.keys(modelActions).forEach(action => {
            if (mirror.actions[namespace][action].isEffect) {
                // copy function
                const fn = mirror.actions[namespace][action];
                // replace function with pre & post loading calls
                mirror.actions[namespace][action] = mirror.actions[namespace][action];
                // mirror.actions[namespace][action] = async function() {
                //     console.log('1>>>', 1);
                //     // mirror.actions.loading.show({ namespace, action })
                //     await fn(...arguments);
                //     console.log('2>>>', 2);
                //     // mirror.actions.loading.hide({ namespace, action })
                // }
            }
        })
    })
}

export default function(mirror, configs) {
    const newConfigs = Object.assign({}, {
        name: 'loading',
        effects: true,
    }, configs);
    const model = createModel(newConfigs);
    mirror.model(model);
    // createActions(mirror, newConfigs);
}
