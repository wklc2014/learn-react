import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';

export default function HModel() {
    this.store = null;
    this.reducers = {};
    this.effects = {};

    this.actions = {};
    this.dispatch = warning;
    this.getState = warning;
}

HModel.prototype.use = function(Plugin, configs) {
    try {
      const plugin = new Plugin(this, configs);
    } catch (e) {
      throw new Error('HModel plugins error: ' + e);
    }
}

// createStore by middlewares
HModel.prototype.createStore = function(middlewares = []) {
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

    const middleware = applyMiddleware(
        thunkMiddleware,
        routerMiddleware(),
        ...middlewares,
        createMiddleware(),
    );

    const rootReducer = combineReducers({
        ...self.reducers,
        routing: routerReducer,
    });
    const enhancers = [middleware];
    const enhancer = compose(...enhancers);
    this.store = createStore(rootReducer, enhancer);
    return this.store;
}

// change modelConfig to model
HModel.prototype.model = function(modelConfig) {
    const self = this;
    const { name, state, reducers, effects } = self.validateModel(modelConfig);
    self.createActions(name, reducers, effects);
    self.createReducers(name, reducers, state);
    self.createEffects(name, effects);
}

HModel.prototype.createActions = function(modelName, reducers = {}, effects = {}) {
    const self = this;
    const reducerKeys = Object.keys(reducers);
    const effectKeys = Object.keys(effects);

    function actionCreator(modelName, actionName) {
        return payload => {
            self.store.dispatch({
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
        self.actions[modelName][effectName] = actionCreator(modelName, effectName);
        self.actions[modelName][effectName].isEffect = true;
    })
}

HModel.prototype.createEffects = function(modelName, effects = {}) {
    const self = this;

    Object.keys(effects).forEach(effectName => {
        self.effects[`${modelName}/${effectName}`] = effects[effectName];
    })
}

HModel.prototype.createReducers = function(modelName, reducers = {}, initState) {
    const self = this;

    function resolveReducers(modelName, reducers = {}) {
        const newReducers = {};
        Object.keys(reducers).forEach(actionName => {
            newReducers[`${modelName}/${actionName}`] = reducers[actionName];
        });
        return newReducers;
    }

    const reducer = resolveReducers(modelName, reducers);

    self.reducers[modelName] = function(state = initState, action) {
        if (reducer[action.type]) {
            return reducer[action.type](state, action);
        }
        return state;
    }
}

// 验证 modelConfig
HModel.prototype.validateModel = function(modelConfig) {
    const { name, state = {}, reducers, effects } = modelConfig || {};

    // model.name 必须是字符串
    if (!name || typeof name !== 'string') {
        throw new Error(`Model name must be a valid string!`);
    }

    if (name === 'routing') {
        throw new Error(`Model name can not be "routing", it is used by react-router-redux!`)
    }

    // model 不能重复创建
    if (this.reducers[name]) {
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

// 检查给定值是否是 Function
function isFunction(value) {
    return typeof value === 'function';
}

function warning() {
    throw new Error(
        'You are calling "dispatch" or "getState" without applying Middleware! ' +
        'Please create your store with Middleware first!'
    )
}
