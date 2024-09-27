import { IsNumber, IsObject, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ResponseInfo } from '../types';

// API Response Value DTO
export class BaseResponse<T> {

  @IsString()
  requestId: string;

  @IsObject()
  responseInfo: ResponseInfo;

  @ValidateNested()
  @Type(() => Object)
  data: T;

  static create<T>(requestId: string, responseInfo: ResponseInfo, data: T): BaseResponse<T> {
      const response = new BaseResponse<T>();
      response.requestId = requestId;
      response.responseInfo = responseInfo;
      response.data = data;

      return response;
  }
}

interface AutoCreatable<T> {
  create(data: Partial<T>): T;
}
// Add Create method Decorator
export function AutoCreate<T>() {
  return function (target: new () => T) {
    target.prototype.create = function (data: Partial<T>): T {
      return Object.assign(new target(), data);
    };
  };
}