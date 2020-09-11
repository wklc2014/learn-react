import axios from 'axios';
import requestHandle from './request-handle.js';

/**
 * 向后台发送请求
 * @param  {String} url     [后台接口地址]
 * @param  {Object} params  [后台接口接受的参数]
 * @param  {Object} options [axios的配置参数]
 * @return {Promise}        [后台返回结果]
 */
export default function request(url, params = {}, options = {}) {
  // axios 默认配置
  const axiosDefaultOptions = {
    timeout: 10000,
  };
  const axiosOptions = Object.assign({}, axiosDefaultOptions, options);

  // 参数处理
  const defaultParams = {};
  const axiosParams = Object.assign({}, defaultParams, params);

  const { method = 'get' } = options;
  if (method.toLowerCase() === 'get') {
    axiosOptions.params = axiosParams;
  } else {
    axiosOptions.data = axiosParams;
  }

  return new Promise((resolve) => {
    axios({ ...axiosOptions, url })
      .then(resp => {
        const response = {
          success: true,
          ...resp.data,
        }
        requestHandle({ response, url });
        resolve(response);
      })
      .catch(err => {
        let message;
        try {
          message = err.toString();
        } catch (e) {
          message = `${url} 请求错误: ${err}`;
        }
        const response = {
          success: false,
          message,
        }
        requestHandle({ response, url });
        resolve(response);
      });
  })
}
