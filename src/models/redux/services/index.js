import * as APIS from '@utils/api.js';
import request from '@utils/request.js';

export function getAuthToken(params) {
  return request(APIS.getAuthToken, params, { method: 'get' });
};
