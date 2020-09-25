export function createModel(configs) {
    const { name, effects } = configs;

    const createReducer = (state, { payload }) => {
        console.log('state>>>', state);
        const { namespace, action } = payload || {};
        const newState = Object.assign({}, state, {
            global: true,
            models: {
                ...state.models,
                [namespace]: true,
            },
        });
        // if (effects) {
        //     newState.effects = Object.assign({}, state.effects, {
        //         [`${namespace}/${action}`]: loading,
        //     });
        // }
        console.log('newState>>>', newState);
        return newState;
    }

    // if (options.effects) {
    //     // collect initial models for effects and create empty objects
    //     model.initialState.effects = Object.keys(mirror.actions || {})
    //         .reduce((models, namespace) => {
    //             models[namespace] = {}
    //             return models
    //         }, {})
    // }

    return {
        name,
        state: {
            global: false,
            models: {},
        },
        reducers: {
            show: createReducer,
            // hide: createReducer(false),
        }
    }
}

function createActions(hmodel, configs) {
    console.log('hmodel>>>', hmodel);
    Object.keys(hmodel.actions).forEach(namespace => {
        if (namespace === configs.name) { return }
        const modelActions = hmodel.actions[namespace];
        // map over effects within models
        Object.keys(modelActions).forEach(action => {
            if (hmodel.actions[namespace][action].isEffect) {
                // copy function
                const fn = hmodel.actions[namespace][action];
                // replace function with pre & post loading calls
                hmodel.actions[namespace][action] = async function() {
                    // hmodel.actions.loading.show({ namespace, action })
                    hmodel.dispatch({
                        type: 'loading/show',
                        payload: { namespace, action }
                    });
                    await fn(...arguments);
                    hmodel.dispatch({
                        type: 'loading/hide',
                        payload: { namespace, action }
                    });
                    // hmodel.actions.loading.hide({ namespace, action })
                }
            }
        })
    })
}

export default function(hmodel, configs) {
    const newConfigs = Object.assign({}, {
        name: 'loading',
        effects: true,
    }, configs);
    const model = createModel(newConfigs);
    hmodel.model(model);
    // createActions(hmodel, newConfigs);
}
