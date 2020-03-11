import * as services from '../services/index.js';
import ACTION_TYPES from '../action-types/index.js';

export function addAmount(amount = 1) {
  return {
    type: ACTION_TYPES.ADD_AMOUNT,
    payload: {
      amount,
    }
  }
}

export function reduceAmount(amount = 1) {
  return {
    type: ACTION_TYPES.REDUCE_AMOUNT,
    payload: {
      amount,
    }
  }
}

export function getAuthToken() {
  return (dispatch, getState) => {
    dispatch({
      type: ACTION_TYPES.LOADING_CITY_NAMES,
      payload: true,
    })

    services.getAuthToken().then(resp => {

      dispatch({
        type: ACTION_TYPES.LOADING_CITY_NAMES,
        payload: false,
      })

      if (resp.success) {
        const list = resp.data.concat();
        list.sort((a, b) => Math.random() - 0.5);

        dispatch({
          type: ACTION_TYPES.UPDATE_CITY_NAMES,
          payload: {
            cityNames: list,
          }
        })
      }

    });

  }
}