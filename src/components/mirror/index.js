import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

// 一些全局变量
const options = {
    models: [],
    effects: {},
    actions: {},
    dispatch: warning,
    getState: warning,
};

export default {
    init,
    model: initModel,
    actions: options.actions,
};

function init(initialState) {
    const middlewares = [
        thunkMiddleware,
        // routerMiddleware(),
        createMiddleware(),
    ];

    if (process.env.NODE_ENV !== 'production') {
        const logMiddleware = createLogger({ collapsed: true });
        middlewares.push(logMiddleware);
    }

    const reducer = createReducer(options.models, {
        // routing: routerReducer,
        loading: loadingReducer,
    });
    const enhancers = [applyMiddleware(...middlewares)];
    const enhancer = compose(...enhancers);
    return createStore(reducer, initialState, enhancer);
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
        options.dispatch = dispatch;
        options.getState = getState;
        return next => action => {
            let result = next(action);
            if (isFunction(options.effects[action.type])) {
                result = options.effects[action.type](action, { getState, dispatch });
            }
            return result;
        }
    }
}

function initModel(modelConfig) {
    const { name, state, reducers, effects } = validateModel(modelConfig);
    const reducer = getReducer(resolveReducers(name, reducers), state);
    options.models.push({ name, reducer });
    addActions(name, reducers, effects);
}

function addActions(modelName, reducers = {}, effects = {}) {
    const reducerKeys = Object.keys(reducers);
    const effectKeys = Object.keys(effects);

    if (reducerKeys.length || effectKeys.length) {
        options.actions[modelName] = options.actions[modelName] || {};
    }

    reducerKeys.forEach(actionName => {
        options.actions[modelName][actionName] = actionCreator(modelName, actionName);
    });

    effectKeys.forEach(effectName => {
        if (options.actions[modelName][effectName]) {
            throw new Error(`Action name "${effectName}" has been used! Please select another name as effect name!`);
        }
        options.effects[`${modelName}/${effectName}`] = effects[effectName];
        options.actions[modelName][effectName] = async function() {
            options.dispatch({ type: 'loading/show' });
            await actionCreator(modelName, effectName);
            options.dispatch({ type: 'loading/hide' });
        }
        options.actions[modelName][effectName].isEffect = true;
    })
}

function actionCreator(modelName, actionName) {
    return payload => {
        options.dispatch({
            type: `${modelName}/${actionName}`,
            payload,
        })
    }
}

// 验证 model
function validateModel(model) {
    const { name, state, reducers, effects } = model || {};

    // model.name 必须是字符串
    if (!name || typeof name !== 'string') {
        throw new Error(`Model name must be a valid string!`);
    }

    if (name === 'routing') {
        throw new Error(`Model name can not be "routing", it is used by react-router-redux!`)
    }

    // model 不能重复创建
    const hasCreated = options.models.find(item => item.name === name);
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

// 执行 reducer 的方法
function getReducer(reducers, initialState = null) {
    return (state = initialState, action) => {
        if (isFunction(reducers[action.type])) {
            return reducers[action.type](state, action);
        }
        return state;
    }
}

// 给 reducer 的 actionName 加上命名空间前缀
function resolveReducers(modelName, reducers = {}) {
    const newReducers = {};
    Object.keys(reducers).forEach(actionName => {
        newReducers[`${modelName}/${actionName}`] = reducers[actionName];
    });
    return newReducers;
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

function loadingReducer(state, action) {
    switch (action.type) {
        case 'show':
            return {
                ...state,
                global: true,
            };
        case 'hide':
            return {
                ...state,
                global: false,
            }
        default:
            return state;
    }
}
