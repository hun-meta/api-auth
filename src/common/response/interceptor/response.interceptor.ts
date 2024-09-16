import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
  } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseResponse } from 'src/common/response/dto/base-response.dto';
import { ClsService } from 'nestjs-cls';
import { ControllerResponse } from '../interface/controller-response.interface';
import { plainToClass } from 'class-transformer';
  
class ControllerResponseClass<T> implements ControllerResponse<T> {
    constructor(public info: any, public data: T) {}
  }

// TODO: 인터셉터 객체 응답 확인 불가능. 수정 필요
@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    constructor(private readonly cls: ClsService) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

        // get Response to set http status
        const response = context.switchToHttp().getResponse();
        const requestId = this.cls.get('requestId');

        console.log("logging requestId at Interceptor: %o", requestId);

        return next.handle().pipe(
            map((customResponse) => {
                const controllerResponse = plainToClass(ControllerResponseClass, customResponse);

                console.log("intercepted Response: %o", controllerResponse);

                const { info, data } = controllerResponse;
                if (info && info.status) {
                    response.status(info.status);
                }

                    return new BaseResponse(requestId, info, data);
            },),
        );
    }
}
