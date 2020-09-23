import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';

const mirror = {
    store: null,
    models: [],
    effects: {},
    actions: {},
    dispatch: warning,
    getState: warning,
}

export default {
    install,
    init,
    model: initModel,
    actions: mirror.actions,
}

function install(plugin, config) {
    try {
        plugin({
            actions: mirror.actions,
            model: initModel,
        }, config);
    } catch (e) {
        console.error('mirror install>>>', e);
        throw new Error('plugin must a method.', e);
    }
}

function init(initState, reducers, middlewares) {
    const totalMiddlewares = [
        thunkMiddleware,
        createMiddleware(),
        ...middlewares,
    ];
    // 将 options.models 合并成根 reducer
    const reducer = createReducer(mirror.models, reducers);
    const enhancers = [applyMiddleware(...totalMiddlewares)];
    const enhancer = compose(...enhancers);
    mirror.store = createStore(reducer, initState, enhancer);
    return mirror.store;
}

function initModel(modelConfig) {
    const { name, state, reducers, effects } = validateModel(modelConfig);
    const reducer = getReducer(resolveReducers(name, reducers), state);
    mirror.models.push({ name, reducer });
    addActions(name, reducers, effects);
}

function getReducer(reducers, state = null) {
    return (initState = state, action) => {
        if (isFunction(reducers[action.type])) {
            return reducers[action.type](initState, action);
        }
        return state;
    }
}

function resolveReducers(modelName, reducers = {}) {
    const newReducers = {};
    Object.keys(reducers).forEach(actionName => {
        newReducers[`${modelName}/${actionName}`] = reducers[actionName];
    });
    return newReducers;
}

// 把各个 models 里的 reducer 创建成一个根 reducer
function createReducer(models, reducers) {
    const modelReducers = {};
    models.forEach((model, idx) => {
        modelReducers[model.name] = model.reducer;
    });
    return combineReducers({
        ...reducers,
        ...modelReducers,
    })
}

function createMiddleware() {
    return ({ dispatch, getState }) => {
        mirror.dispatch = dispatch;
        mirror.getState = getState;
        return next => action => {
            let result = next(action);
            if (isFunction(mirror.effects[action.type])) {
                result = mirror.effects[action.type](action, { getState, dispatch });
            }
            return result;
        }
    }
}

function addActions(modelName, reducers = {}, effects = {}) {
    const reducerKeys = Object.keys(reducers);
    const effectKeys = Object.keys(effects);

    function actionCreator(modelName, actionName) {
        return payload => {
            mirror.dispatch({
                type: `${modelName}/${actionName}`,
                payload,
            })
        }
    }

    if (reducerKeys.length || effectKeys.length) {
        mirror.actions[modelName] = mirror.actions[modelName] || {};
    }

    reducerKeys.forEach(actionName => {
        mirror.actions[modelName][actionName] = actionCreator(modelName, actionName);
    });

    effectKeys.forEach(effectName => {
        if (mirror.actions[modelName][effectName]) {
            throw new Error(`Action name "${effectName}" has been used! Please select another name as effect name!`);
        }
        mirror.effects[`${modelName}/${effectName}`] = effects[effectName]
        mirror.actions[modelName][effectName] = actionCreator(modelName, effectName);
        mirror.actions[modelName][effectName].isEffect = true;
    })
}

// 验证 model
function validateModel(modelConfig) {
    const { name, state, reducers, effects } = modelConfig || {};

    // model.name 必须是字符串
    if (!name || typeof name !== 'string') {
        throw new Error(`Model name must be a valid string!`);
    }

    if (name === 'routing') {
        throw new Error(`Model name can not be "routing", it is used by react-router-redux!`)
    }

    // model 不能重复创建
    const hasCreated = mirror.models.find(item => item.name === name);
    if (hasCreated) {
        throw new Error(`Model "${name}" has been created, please select another name!`);
    }

    if (reducers !== undefined && !isObject(reducers)) {
        throw new Error(`Model reducers must be a valid object!`)
    }

    if (effects !== undefined && !isObject(effects)) {
        throw new Error(`Model effects must be a valid object!`)
    }

    function filterReducers(reducers) {
        if (!reducers) return {};
        const filters = {};
        Object.keys(reducers).forEach(key => {
            // 确保 reducers.* 是函数
            if (isFunction(reducers[key])) {
                filters[key] = reducers[key];
            }
        })
        return filters;
    }

    return {
        name,
        state,
        reducers: filterReducers(reducers),
        effects: filterReducers(effects),
    }
}

// 检查给定值是否是对象
function isObject(value) {
    return Object.prototype.toString.call(value) === '[object Object]';
}

// 检查给定值是否是数组
function isArray(value) {
    return Object.prototype.toString.call(value) === '[object Array]';
}

// 检查给定值是否是 Function
function isFunction(value) {
    return typeof value === 'function';
}

function warning() {
    throw new Error(
        'You are calling "dispatch" or "getState" without applying mirrorMiddleware! ' +
        'Please create your store with mirrorMiddleware first!'
    )
}
