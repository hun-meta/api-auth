import { Injectable } from '@nestjs/common';
import { DefaultDto, HealthCheckDto } from '../dtos/default.dto';
import { IsNumber } from 'class-validator';

export class CheckDto {
  @IsNumber()
  param: number;

  static create(param: any): CheckDto {
    const dto = new CheckDto();
    dto.param = param;
    return dto;
  }
}

@Injectable()
export class AppService {
  constructor() {}
  
  getDefaultResponse(): DefaultDto {

    const welcomeStr = "Welcome to API - Auth\n";
    const currentDate = new Date();
    const curDatetime = currentDate.toISOString();
    const responseStr = welcomeStr + curDatetime;

    return DefaultDto.create(responseStr);
  }

  getHealth(): HealthCheckDto {

    const currentDate = new Date();
    const curDatetime = currentDate.toISOString();

    return HealthCheckDto.create(curDatetime);
  }

  checkUsePipe(value: any): CheckDto {

    const currentDate = new Date();
    const curDatetime = currentDate.toISOString();

    return CheckDto.create(value);
  }
}

