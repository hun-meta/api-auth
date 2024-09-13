import { Injectable } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { BaseResponseDto } from 'src/common/response/dto/base-response.dto';
import { DefaultDto } from '../dtos/default.dto';

@Injectable()
export class AppService {
  constructor(private readonly cls: ClsService) {}
  
  getDefaultResponse(): BaseResponseDto<DefaultDto> {
    const requestId = this.cls.get('requestId');
    console.log("Get Request By App Service: %o", requestId);

    const currentDate = new Date();
    const curDatetime = currentDate.toISOString();

    const data: DefaultDto = {
      datetime: curDatetime,
    };

    const response: BaseResponseDto<DefaultDto> = {
      requestId: requestId,
      returnCode: 0,
      data: data,
    };

    return response;
  }

  getHealth(): BaseResponseDto<DefaultDto> {
    const currentDate = new Date();
    const curDatetime = currentDate.toISOString();

    const data: DefaultDto = {
      datetime: curDatetime,
    };

    const response: BaseResponseDto<DefaultDto> = {
      requestId: 'health-check',
      returnCode: 0,
      data: data,
    };

    return response;
  }

}
