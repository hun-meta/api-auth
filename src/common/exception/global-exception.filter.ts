// all-exceptions.filter.ts
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { ClsService } from 'nestjs-cls';
import { GlobalErrorDto } from './dto';
import { BAD_REQUEST, CONFLICT, FORBIDDEN, GONE, INTERNAL_SERVER_ERROR, NOT_FOUND, NOT_IMPLEMENTED, PAYLOAD_TOO_LARGE, SERVICE_UNAVAILABLE, UNAUTHORIZED, UNPROCESSABLE_ENTITY, UNSUPPORTED_MEDIA_TYPE } from './types';
import { BaseResponse } from '../response/dto/base-response.dto';

// TODO: 예외 필터에서 반환하는 값을 ResponseInterceptor에서 캐치하길 원하지만 동작하지 않음, 값이 사라짐?
// INFO: 전역 에러 핸들링 필터(http 에러)
@Catch()
export class GlobalExceptionsFilter implements ExceptionFilter {
    constructor(
        private readonly cls: ClsService
      ) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let stack = '';
    let info = null;
    const requestId = this.cls.get('requestId');

    // get StackTrace
    if (exception instanceof Error) {
        stack = exception.stack || '';
    }

    // http exception handling
    if (exception instanceof HttpException) {
        status = exception.getStatus();
        const exceptionResponse = exception.getResponse();
        message = typeof exceptionResponse === 'string' 
            ? exceptionResponse 
            : (exceptionResponse as any).message || exception.message;

        switch(status){
            case HttpStatus.BAD_REQUEST:
                const exceptionResponse = exception.getResponse() as any;
                if (Array.isArray(exceptionResponse.message)) {
                    message = exceptionResponse.message.join(', ');
                }
                info = BAD_REQUEST; 
                break;
            case HttpStatus.UNAUTHORIZED:
                info = UNAUTHORIZED;
                break;
            case HttpStatus.FORBIDDEN:
                info = FORBIDDEN;
                break;
            case HttpStatus.NOT_FOUND:
                info = NOT_FOUND;
                break;
            case HttpStatus.CONFLICT:
                info = CONFLICT;
                break;
            case HttpStatus.GONE:
                info = GONE;
                break;
            case HttpStatus.PAYLOAD_TOO_LARGE:
                info = PAYLOAD_TOO_LARGE;
                break;
            case HttpStatus.UNSUPPORTED_MEDIA_TYPE:
                info = UNSUPPORTED_MEDIA_TYPE;
                break;
            case HttpStatus.UNPROCESSABLE_ENTITY:
                info = UNPROCESSABLE_ENTITY;
                break;
            case HttpStatus.INTERNAL_SERVER_ERROR:
                info = INTERNAL_SERVER_ERROR;
                break;
            case HttpStatus.NOT_IMPLEMENTED:
                info = NOT_IMPLEMENTED;
                break;
            case HttpStatus.SERVICE_UNAVAILABLE:
                info = SERVICE_UNAVAILABLE;
                break;
            default:
                info = INTERNAL_SERVER_ERROR;
        }
    }

    console.log(`Request Error - ID: ${requestId}, Error: ${message}`);
    console.error(`Request Error - ID: ${requestId}, Error: ${message}\nStack: ${stack}`);

    const errDto = GlobalErrorDto.create(message);

    const baseResponse = BaseResponse.create<GlobalErrorDto>(requestId, info, errDto);

    response
      .status(info.status)
      .json(baseResponse);
  }
}
