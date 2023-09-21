import instance from "./request";
import { AxiosRequest, CustomResponse } from "./type";

class BaseHttp {
  // 外部传入的baseUrl
  protected baseURL: string = '/';
  // 自定义header头
  protected headers: object = {
    ContentType: 'application/json;charset=UTF-8'
  }
  constructor() { }
  private apiAxios({
    baseURL = this.baseURL,
    headers = this.headers,
    method,
    url,
    data,
    params,
    responseType
  }: AxiosRequest): Promise<any> {

    return new Promise((resolve, reject) => {
      instance({
        baseURL,
        method,
        url,
        params,
        data,
        headers,
        responseType
      }).then((res: any) => {
        console.log('请求， %o', res)
        // 200:服务端业务处理正常结束
        if (res.status === 200) {
          resolve({
            ...(res?.data?.data),
            status: true,
            message: res?.data?.message ?? "成功"
          });
        } else {
          resolve({
            status: false,
            message: res.data?.errorMessage || (url + '请求失败'),
          });
        }
      }).catch((err: any) => {
        const message = err?.data?.errorMessage || err?.message || (url + '请求失败');
        // eslint-disable-next-line
        reject({ status: false, message, data: null });
      });
    });
  }

  /**
   * GET类型的网络请求
   */
  public getReq({
    baseURL,
    headers,
    url,
    data,
    params,
    responseType
  }: AxiosRequest) {
    return this.apiAxios({
      baseURL,
      headers,
      method: 'GET',
      url,
      data,
      params,
      responseType
    });
  }

  /**
   * POST类型的网络请求
   */
  public postReq({ baseURL, headers, url, data, params, responseType }: AxiosRequest) {
    return this.apiAxios({ baseURL, headers, method: 'POST', url, data, params, responseType });
  }

  /**
   * PUT类型的网络请求
   */
  public putReq({ baseURL, headers, url, data, params, responseType }: AxiosRequest) {
    return this.apiAxios({ baseURL, headers, method: 'PUT', url, data, params, responseType });
  }

  /**
   * DELETE类型的网络请求
   */
  public deleteReq({ baseURL, headers, url, data, params, responseType }: AxiosRequest) {
    return this.apiAxios({ baseURL, headers, method: 'DELETE', url, data, params, responseType });
  }
}

export default new BaseHttp()