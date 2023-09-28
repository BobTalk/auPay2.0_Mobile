import axios, { AxiosRequestConfig } from 'axios';
import { PendingType } from './type';
import { getSession, removeSession } from '@/utils/base';
import { Toast } from 'antd-mobile';
// 取消重复请求
const pending: Array<PendingType> = [];
const CancelToken = axios.CancelToken;

// axios 实例
const instance = axios.create({
  timeout: 10000,
  responseType: 'json'
});

// 移除重复请求
const removePending = (config: AxiosRequestConfig) => {
  for (const key in pending) {
    const item: number = +key;
    const list: PendingType = pending[key];
    // 当前请求在数组中存在时执行函数体
    if (list.url === config.url && list.method === config.method && JSON.stringify(list.params) === JSON.stringify(config.params) && JSON.stringify(list.data) === JSON.stringify(config.data)) {
      // 执行取消操作
      list.cancel('操作太频繁，请稍后再试');
      // 从数组中移除记录
      pending.splice(item, 1);
    }
  }
};

// 添加请求拦截器
instance.interceptors.request.use(
  (request: any) => {
    // removePending(request);
    request.cancelToken = new CancelToken((c) => {
      pending.push({ url: request.url, method: request.method, params: request.params, data: request.data, cancel: c });
    });
    request.headers.token = getSession('token')
    return request;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);
// 添加响应拦截器
instance.interceptors.response.use(
  (response: any) => {
    // removePending(response.config);
    const errorCode = response?.data?.code;
    if (errorCode === 401) {
      Toast.show({
        content: '登陆信息已过期,请重新登陆'
      })
      removeSession('token')
      window.history.forward()
      return {
        status: false,
        data: {message: response.data.message},
        code:errorCode
      }
    }
    if ([1001, 1013, 1017,1007].includes(errorCode)) {
      return {
        status: errorCode,
        data: { message: response.data.message }
      }
    }
    return response;
  },
  (error: any) => {
    const response = error.response;

    // 根据返回的http状态码做不同的处理
    switch (response?.status) {
      case 401:
        // token失效
        break;
      case 403:
        // 没有权限
        break;
      case 500:
        // 服务端错误
        break;
      case 503:
        // 服务端错误
        break;
      default:
        break;
    }

    return Promise.reject(response || { message: error.message });
  }
);


export default instance