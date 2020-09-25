import * as services from '@utils/services.js';
import ACTION_TYPES from '../action-types/index.js';

export function addAmount(count = 1) {
  return {
    type: ACTION_TYPES.ADD_AMOUNT,
    payload: {
      count,
    }
  }
}

export function reduceAmount(count = 1) {
  return {
    type: ACTION_TYPES.REDUCE_AMOUNT,
    payload: {
      count,
    }
  }
}

export function getAuthToken() {
  return (dispatch, getState) => {
    dispatch({
      type: ACTION_TYPES.LOADING_CITY_NAMES,
      payload: true,
    })

    services.zmCustormCard().then(resp => {

      dispatch({
        type: ACTION_TYPES.LOADING_CITY_NAMES,
        payload: false,
      })
      dispatch({
        type: ACTION_TYPES.UPDATE_CITY_NAMES,
        payload: {
          app: resp,
        }
      })

    });

  }
}
