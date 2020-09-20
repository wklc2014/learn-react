export default (mirror, options = {}) => {
    const name = options.name || 'loading';
    // create model
    createLoadingModel(name, mirror, options);

    // map over actions
    addLoadingToEffects(name, mirror);
}

function createLoadingModel(name, mirror, options) {
    // function to generate both "show" & "hide" reducers
    const createLoadingAction = (show) => (state, { namespace, action }) => {
        const next = Object.assign({}, state, {
            global: show,
            models: Object.assign({}, state.models, {
                [namespace]: show,
            }),
        })
        if (options.effects) {
            next.effects = Object.assign({}, state.effects, {
                [namespace]: Object.assign({}, state.effects[namespace], {
                    [action]: show,
                })
            })
        }
        console.log('next>>>', next);
        return next
    }

    // create mirror "loading" model
    const model = {
        name,
        initialState: {
            global: false,
            models: {},
        },
        reducers: {
            show: createLoadingAction(true),
            hide: createLoadingAction(false),
        }
    }

    // add effects if option specified
    if (options.effects) {
        // collect initial models for effects and create empty objects
        model.initialState.effects = Object.keys(mirror.actions || {})
            .reduce((models, namespace) => {
                models[namespace] = {}
                return models
            }, {})
    }

    // instantiate model
    mirror.model(model);
}


function addLoadingToEffects(name, mirror) {
    Object.keys(mirror.actions).forEach(namespace => {
        if (namespace === name) { return }
        const modelActions = mirror.actions[namespace]
        // map over effects within models
        Object.keys(modelActions).forEach(action => {
            console.log('action>>>', mirror);
            if (mirror.actions[namespace][action].isEffect) {
                // copy function
                const fn = mirror.actions[namespace][action]
                // replace function with pre & post loading calls
                mirror.actions[namespace][action] = async function(props) {
                    mirror.actions.loading.show({ namespace, action })
                    await fn(props)
                    mirror.actions.loading.hide({ namespace, action })
                }
            }
        })
    })
}
