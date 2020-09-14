import actionTypes from './actionTypes.js';

export function increase(value = 1){
  return {
    type: actionTypes.increase,
    payload: value,
  }
}

export function decrease(value = 1){
  return {
    type: actionTypes.decrease,
    payload: value,
  }
}
