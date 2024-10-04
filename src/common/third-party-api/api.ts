import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { BaseResponse } from '../response/dto/base-response.dto';


export interface AxiosError<T> {
  message: string;
  name: string;
  code: string;
  config: AxiosRequestConfig;
  request?: any; // XMLHttpRequest or Node.js http.ClientRequest
  response?: {
    status: number;
    statusText: string;
    config: any;
    headers: any;
    request: any;
    data: BaseResponse<T>;
  };
  stack?: string;
}

// API 서버 요청 관련 최상위 부모 클래스
class API {
  protected url: string;
  protected axiosInstance: AxiosInstance;

  // 생성자, URL을 매개변수로 받음
  constructor(url: string) {
    this.url = url;

    this.axiosInstance = axios.create({
      baseURL: this.url,
    });
  }

  // API 요청 메소드
  protected async request<T = BaseResponse<any>>(
    config: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    try {
      const response = await this.axiosInstance.request<T>(config);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error(`Unknown Error: ${error}`);
      }
    }
  }

  // GET 요청 설정 생성 메소드
  protected createGetConfig(
    endpoint: string,
    params?: any,
    headers?: any
  ): AxiosRequestConfig {
    return {
      method: 'get',
      url: endpoint,
      params: params,
      headers: headers,
    };
  }

  // POST 요청 설정 생성 메소드
  protected createPostConfig(
    endpoint: string,
    data?: any,
    headers?: any
  ): AxiosRequestConfig {
    return {
      method: 'post',
      url: endpoint,
      data: data,
      headers: headers,
    };
  }

  // PUT 요청 설정 생성 메소드
  protected createPutConfig(
    endpoint: string,
    data?: any,
    headers?: any
  ): AxiosRequestConfig {
    return {
      method: 'put',
      url: endpoint,
      data: data,
      headers: headers,
    };
  }

  // PATCH 요청 설정 생성 메소드
  protected createPatchConfig(
    endpoint: string,
    data?: any,
    headers?: any
  ): AxiosRequestConfig {
    return {
      method: 'patch',
      url: endpoint,
      data: data,
      headers: headers,
    };
  }

  // DELETE 요청 설정 생성 메소드
  protected createDeleteConfig(
    endpoint: string,
    params?: any,
    headers?: any
  ): AxiosRequestConfig {
    return {
      method: 'delete',
      url: endpoint,
      params: params,
      headers: headers,
    };
  }
}

export { API };
