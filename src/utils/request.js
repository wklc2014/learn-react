/**
 * 请求后台接口方法
 * url 接口地址
 * params 接口参数
 * options axios 的配置参数
 */
import axios from 'axios';
import requestAfter from './request-after.js';

export default function request(url, params = {}, options = {}) {

  // axios 配置
  const defaultOptions = {
    timeout: 10000,
  }
  const axiosOptions = Object.assign({}, defaultOptions, options);

  // 参数处理
  const defaultParams = {

  }
  const axiosParams = Object.assign({}, defaultParams, params);

  const { method = 'get' } = options;
  if (method.toLowerCase() === 'get') {
    axiosOptions.params = axiosParams;
  } else {
    axiosOptions.data = axiosParams;
  }

  return new Promise((resolve) => {
    axios({ ...axiosOptions, url })
      .then((resp) => {
        requestAfter({ resp: resp.data, url });
        resolve(resp.data);
      })
      .catch((err) => {
        let message;
        try {
          message = err.toString();
        } catch (e) {
          message = `${url} 请求错误: ${err}`;
        }
        const resp = {
          success: false,
          message,
        }
        requestAfter({ resp, url });
        resolve(resp);
      });
  })
}