import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';

export default function Mirror() {
    this.store = null;
    this.models = [];
    this.effects = {};
    this.actions = {};
    this.dispatch = warning;
    this.getState = warning;
}

Mirror.prototype.install = function(plugin, config) {
    try {
        plugin(this, config);
    } catch (e) {
        console.error('mirror install>>>', e);
        throw new Error('plugin must a method.', e);
    }
}

// createStore by middlewares
Mirror.prototype.createStore = function(middlewares = []) {
    const self = this;

    function createMiddleware() {
        return ({ dispatch, getState }) => {
            self.dispatch = dispatch;
            self.getState = getState;
            return next => action => {
                let result = next(action);
                if (isFunction(self.effects[action.type])) {
                    result = self.effects[action.type](action, { getState, dispatch });
                }
                return result;
            }
        }
    }

    const totalMiddlewares = [
        thunkMiddleware,
        ...middlewares,
        createMiddleware(),
    ];

    // merge reducers
    function createReducer(models) {
        const modelReducers = {};
        models.forEach((model, idx) => {
            modelReducers[model.name] = model.reducer;
        });
        return combineReducers(modelReducers);
    }

    // 将 options.models 合并成根 reducer
    const reducer = createReducer(this.models);
    const enhancers = [applyMiddleware(...totalMiddlewares)];
    const enhancer = compose(...enhancers);
    this.store = createStore(reducer, enhancer);
    return this.store;
}

Mirror.prototype.model = function(modelConfig) {

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

    const { name, state, reducers, effects } = this.validateModel(modelConfig);
    const reducer = getReducer(resolveReducers(name, reducers), state);
    this.models.push({ name, reducer });
    this.addActions(name, reducers, effects);
}

Mirror.prototype.addActions = function(modelName, reducers = {}, effects = {}) {
    const self = this;
    const reducerKeys = Object.keys(reducers);
    const effectKeys = Object.keys(effects);

    function actionCreator(modelName, actionName) {
        return payload => {
            self.dispatch({
                type: `${modelName}/${actionName}`,
                payload,
            })
        }
    }

    if (reducerKeys.length || effectKeys.length) {
        self.actions[modelName] = self.actions[modelName] || {};
    }

    reducerKeys.forEach(actionName => {
        self.actions[modelName][actionName] = actionCreator(modelName, actionName);
    });

    effectKeys.forEach(effectName => {
        if (self.actions[modelName][effectName]) {
            throw new Error(`Action name "${effectName}" has been used! Please select another name as effect name!`);
        }
        self.effects[`${modelName}/${effectName}`] = effects[effectName];
        self.actions[modelName][effectName] = actionCreator(modelName, effectName);
        self.actions[modelName][effectName].isEffect = true;
    })
}

// 验证 model
Mirror.prototype.validateModel = function(modelConfig) {
    const { name, state, reducers, effects } = modelConfig || {};

    // model.name 必须是字符串
    if (!name || typeof name !== 'string') {
        throw new Error(`Model name must be a valid string!`);
    }

    if (name === 'routing') {
        throw new Error(`Model name can not be "routing", it is used by react-router-redux!`)
    }

    // model 不能重复创建
    const hasCreated = this.models.find(item => item.name === name);
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
