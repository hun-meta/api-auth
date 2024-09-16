import { ResponseInfo } from '../types';

export interface ControllerResponse<T> {
  info: ResponseInfo;
  data: T;
}
