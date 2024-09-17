import { IsNumber, IsObject, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ResponseInfo } from '../types';

// API Response Value DTO
export class BaseResponse<T> {

  constructor(
    requestId: string,
    responseInfo: ResponseInfo,
    data: T,
  ){
    this.requestId = requestId;
    this.responseInfo = responseInfo;
    this.data = data;
  }

  @IsString()
  requestId: string;

  @IsObject()
  responseInfo: ResponseInfo;

  @ValidateNested()
  @Type(() => Object)
  data: T;
}
