import { Injectable } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { DefaultDto, HealthCheckDto } from '../dtos/default.dto';

@Injectable()
export class AppService {
  constructor(private readonly cls: ClsService) {}
  
  getDefaultResponse(): DefaultDto {
    const requestId = this.cls.get('requestId');
    console.log("Get Request By App Service: %o", requestId);

    const currentDate = new Date();
    const curDatetime = currentDate.toISOString();

    return DefaultDto.create(curDatetime);
  }

  getHealth(): HealthCheckDto {
    const currentDate = new Date();
    const curDatetime = currentDate.toISOString();

    return HealthCheckDto.create(curDatetime);
  }
}

