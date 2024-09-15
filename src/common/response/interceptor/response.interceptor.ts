import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
  } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseResponse } from 'src/common/response/dto/base-response.dto';
import { ResponseInfo } from '../types';
import { ClsService } from 'nestjs-cls';
  
@Injectable()
export class ApiResponseInterceptor implements NestInterceptor {
    constructor(private readonly cls: ClsService) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

        // get Response to set http status
        const response = context.switchToHttp().getResponse();
        const requestId = this.cls.get('requestId');

        return next.handle().pipe(
            map(
                ( customResponse: {
                    info: ResponseInfo;
                    data: Object;
                }) => {
                    const { info, data } = customResponse;
                    if (info && info.status) {
                        response.status(info.status);
                    }

                    return new BaseResponse(``, info, data);
                },
            ),
        );
    }
}