import axios, { Axios, AxiosResponse } from 'axios';
import { BaseResponse } from '../response/dto/base-response.dto';

// API 서버 요청 관련 최상위 부모 클래스
class API {

    protected async post<T,U>(url: string, requestBody: U, headers: Record<string, string> = {}){
        try{
            const response: AxiosResponse<T> = await axios.post(url, requestBody, { headers });
            return response.data;
        }catch(error){
            throw error;
        }
        
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