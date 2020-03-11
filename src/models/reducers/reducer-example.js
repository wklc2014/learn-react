import ACTION_TYPES from '../action-types/index.js';

function addAmount(state, { payload }) {
  return { ...state, amount: state.amount + payload.amount };
}

function reduceAmount(state, { payload }) {
  return { ...state, amount: state.amount - payload.amount };
}

function updateCityNames(state, { payload }) {
  return { ...state, cityNames: payload.cityNames };
}

function loadingCityNames(state, { payload = true }) {
  return { ...state, loading: payload };
}

export default (state = [], action) => {
  switch (action.type) {
    case ACTION_TYPES.ADD_AMOUNT:
      return addAmount(state, action);

    case ACTION_TYPES.REDUCE_AMOUNT:
      return reduceAmount(state, action);

    case ACTION_TYPES.UPDATE_CITY_NAMES:
      return updateCityNames(state, action);

    case ACTION_TYPES.LOADING_CITY_NAMES:
      return loadingCityNames(state, action);

    default:
      return state;
  }
}