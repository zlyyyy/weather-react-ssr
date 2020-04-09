/* eslint-disable no-param-reassign */
import http from '../utils/http';
import api from './api';

// const API_PREIFX = 'http://localhost:7001';
const API_PREIFX = 'https://weather.zhaoly.cn';

const parseKey = key => {
  let method = 'get';
  let path = key;

  if (key.indexOf(' ') > -1) {
    const splited = key.split(' ');
    method = splited[0].toLowerCase();
    // eslint-disable-next-line prefer-destructuring
    path = splited[1];
  }
  return { method, path };
};

const gen = param => {
  // if (typeof param === 'object' && param.typeCode) {
  //   return async function () {
  //     return http.typecode(param);
  //   };
  // }
  const { method, path } = parseKey(param);
  const url = (API_PREIFX || '') + path;
  return async function (data, headers, config) {
    // console.log(method, url, data, headers, config)
    return http[method](url, data, headers, config);
  };
};

const API = {};
const addAPI = (apiObj, functionObj) => {
  for (const key in apiObj) {
    if (Object.prototype.hasOwnProperty.call(apiObj, key)) {
      const item = apiObj[key];
      if (typeof item === 'string') {
        functionObj[key] = gen(item);
      } else if (typeof item === 'object') {
        if (!functionObj[key]) {
          functionObj[key] = {};
        }
        addAPI(item, functionObj[key]);
      }
    }
  }
};
addAPI(api, API);
export default API;
