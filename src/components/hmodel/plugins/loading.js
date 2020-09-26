export default function HModelLoading(configs = {}) {
    this.configs = Object.assign({}, {
        name: 'loading',
        effects: true,
    }, configs);
}

HModelLoading.prototype.start = function(hmodel) {
    if (!hmodel) return;
    this.hmodel = hmodel;
    this.createModel();
    this.createActions();
}

HModelLoading.prototype.createModel = function() {
    const { name, effects } = this.configs;

    const createReducer = (loading) => (state, { payload }) => {
        const { namespace, action } = payload || {};
        const newState = Object.assign({}, state, {
            global: loading,
            models: {
                ...state.models,
                [namespace]: loading,
            },
        });
        if (effects) {
            newState.effects = Object.assign({}, state.effects, {
                [`${namespace}/${action}`]: loading,
            });
        }
        return newState;
    }

    const model = {
        name,
        state: {
            global: false,
            models: {},
        },
        reducers: {
            show: createReducer(true),
            hide: createReducer(false),
        }
    }

    this.hmodel.model(model);
}

HModelLoading.prototype.createActions = function() {
    const { configs, hmodel: { actions, effects, dispatch } } = this;
    Object.keys(actions).forEach(namespace => {
        if (namespace === configs.name || !actions[namespace]) return;
        // map over effects within models
        Object.keys(actions[namespace]).forEach(action => {
            if (actions[namespace][action].isEffect && effects[`${namespace}/${action}`]) {
                // copy function
                const fn = effects[`${namespace}/${action}`];
                // replace function with pre & post loading calls
                effects[`${namespace}/${action}`] = async function() {
                    actions.loading.show({ namespace, action });
                    await fn(...arguments);
                    actions.loading.hide({ namespace, action });
                }
            }
        })
    })
}
