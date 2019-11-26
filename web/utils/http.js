import _ from 'lodash';
import fetch from 'isomorphic-fetch';
import URLSearchParams from 'url-search-params';
import replacePlaceholder from './replacePlaceholder';

const REQUEST_INTERVAL = 5000;
const CODE_MESSAGE = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

export class Http {
  defaultConfig = {
    csrf: false,
    errorHook: error => {
      console.error(error);
    },
    isResultCheck: true,
    parseResult: data => data,
    isGetParamJsonStringfy: false,
    correctErrCode: 200,
  };

  checkStatus(response) {
    if (response.status === 200) {
      return response;
    }
    const error = new Error(
      response.statusText || CODE_MESSAGE[response.status]
    );
    error.status = response.status;
    error.data = response;
    throw error;
  }

  checkErrCode(dataObj) {
    const { error_code: errCode, data, errMsg } = dataObj;
    if (!errCode || errCode === this.defaultConfig.correctErrCode) {
      return;
    }
    const error = new Error(errMsg);
    error.errCode = errCode;
    error.data = data;
    throw error;
  }

  parseResult(data) {
    this.checkErrCode(data);
    return this.defaultConfig.parseResult
      ? this.defaultConfig.parseResult(data)
      : data;
  }

  async parseJSON(response) {
    return response.json();
  }

  async processResult(response) {
    this.checkStatus(response);
    const returnResponse = await this.parseJSON(response);
    if (!this.defaultConfig.isResultCheck) {
      return returnResponse;
    }
    return this.parseResult(returnResponse, response.url);
  }

  /**
   * headers
   * csrf
   * host
   * cqrs
   * */
  set config(config) {
    this.defaultConfig = {
      ...this.defaultConfig,
      ...config,
    };
  }

  replaceRESTfulPlaceholder = (api, data = {}) => {
    const result = replacePlaceholder(api, /:\w+/g, data);
    return {
      api: result.string,
      data: result.data,
    };
  };

  objectToFormData = (obj, form, namespace) => {
    const fd = form || new FormData();
    let formKey;
    for (const property in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, property)) {
        if (namespace) {
          formKey = namespace + Array.isArray(obj) ? '[]' : `[${property}]`;
        } else {
          formKey = property;
        }

        // if the property is an object, but not a File, use recursivity.
        if (
          typeof obj[property] === 'object' &&
          !(obj[property] instanceof File)
        ) {
          this.objectToFormData(obj[property], fd, formKey);
        } else {
          // if it's a string or a File object
          fd.append(formKey, obj[property]);
        }
      }
    }

    return fd;
  };

  requestPromises = new Map();

  requestCache(url, customOptions, headers = {}, config = {}) {
    const hash = `${url}-${JSON.stringify(customOptions)}-${JSON.stringify(
      headers
    )}-${JSON.stringify(config)}`;
    const o = this.requestPromises.get(hash);
    const now = Date.now();
    if (o && now - o.now < REQUEST_INTERVAL) {
      return o.promise;
    }
    const promise = this.request(url, customOptions, headers, config);
    const output = {
      now,
      promise,
    };
    this.requestPromises.set(hash, output);
    return promise;
  }

  fetchRetryTimes = 0;

  async request(url, customOptions, headers = {}, config = {}) {
    const options = _.assign(
      {
        credentials: 'same-origin', // include, same-origin, *omit
      },
      customOptions
    );
    options.headers = Object.assign(
      {
        'x-requested-with': 'XMLHttpRequest'
      },
      options.headers || {},
      headers || {}
    );
    try {
      const response = await fetch(url, options);
      const processedResponse = await this.processResult(response);
      return processedResponse;
    } catch (error) {
      if (this.fetchRetryTimes > 2) {
        this.fetchRetryTimes = 0;
        this.defaultConfig.errorHook(error, url);
        if (config.throwError) throw error;
        return null;
      }
      this.fetchRetryTimes += 1;
      await this.request(url, customOptions, headers, config);
    }
  }

  async get(getApi, getData = {}, headers = {}, config = {}) {
    const { api, data } = this.replaceRESTfulPlaceholder(getApi, getData);
    let query;
    if (_.isEmpty(data)) {
      query = '';
    } else if (this.defaultConfig.isGetParamJsonStringfy) {
      query = `?json=${encodeURIComponent(JSON.stringify(data))}`;
    } else {
      // https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams
      const searchParams = new URLSearchParams();
      _.keys(data).forEach(key => {
        searchParams.append(key, data[key]);
      });
      query = `?${searchParams.toString()}`;
    }
    return this.requestCache(`${api}${query}`, {}, headers, config);
  }

  async post(postApi, postData = {}, customeHeaders = {}, config = {}) {
    const { api, data } = this.replaceRESTfulPlaceholder(postApi, postData);
    const csrfToken = await this.getCsrfToken();
    const headers = {
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': csrfToken,
      ...customeHeaders,
    };
    const body = JSON.stringify(data);
    return this.requestCache(
      api,
      {
        method: 'POST',
        headers,
        body,
      },
      {},
      Object.assign({ loadingState: true }, config)
    );
  }

  async form(formApi, formData, customeHeaders = {}, config = {}) {
    const { api, data } = this.replaceRESTfulPlaceholder(formApi, formData);
    const csrfToken = await this.getCsrfToken();
    const headers = {
      'X-CSRF-TOKEN': csrfToken,
      'Content-Type': 'multipart/form-data',
      ...customeHeaders,
    };
    const body =
      data instanceof FormData
        ? data
        : this.objectToFormData(JSON.stringify(data));
    return this.requestCache(
      api,
      {
        method: 'POST',
        headers,
        body,
      },
      {},
      config
    );
  }
  
}

const http = new Http();

export default http;
