import { Injectable } from '@nestjs/common';
import { CheckUsePipeDto, DefaultDto, HealthCheckDto } from '../dtos/default.dto';
import { IsNumber } from 'class-validator';

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

  checkUsePipe(value: any): CheckUsePipeDto {

    const currentDate = new Date();
    const curDatetime = currentDate.toISOString();

    return CheckUsePipeDto.create(value);
  }
}

