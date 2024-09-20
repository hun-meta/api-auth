import { Controller, DynamicModule, Get, Logger, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { AppService, CheckDto } from './app.service';
import { DefaultDto, HealthCheckDto } from '../dtos/default.dto';
import { SUCCESS_RES } from '../types';
import { ControllerResponse } from 'src/common/response/dto/controller-response.dto';
import { IsString, IsOptional, IsNumber, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

class CheckQueryDto {
  @IsNotEmpty()
  @IsNumber()
  @Type(()=> Number)
  param1: number;

  @IsString()
  @IsOptional()
  param2?: string;
}

// NOTE:
// 1. Routing
// 2. Request data collection and validation
// 3. Call Service
// 4. Send Response
@Controller()
@UsePipes(new ValidationPipe({transform: true}))
export class AppController {

  private logger = new Logger(AppController.name);

  constructor(
    private readonly appService: AppService
  ) {}

  // Default Path
  @Get()
  async getDefaultResponse(): Promise<ControllerResponse<DefaultDto>> {

    const data = this.appService.getDefaultResponse();
    const response = ControllerResponse.create<DefaultDto>(SUCCESS_RES, data);
    console.log("Controller response: %o", response);
    this.logger.log("winston log");
    await new Promise(resolve => setTimeout(resolve, 1000));
    this.logger.log("winston log response: %o", response);
    this.logger.debug(response);
    this.logger.error("error");

    return response;
  }

  // AWS Health Check Path
  @Get('health')
  getHealth(): ControllerResponse<HealthCheckDto> {
    const data = this.appService.getHealth();
    const response = ControllerResponse.create<HealthCheckDto>(SUCCESS_RES, data);
    console.log("Controller response: %o", response);

    return response;
  }

  @Get('check')
  checkUsePipe(@Query() query: CheckQueryDto): ControllerResponse<CheckDto> {
    console.log("query: %o", query);
    const data = this.appService.checkUsePipe(query.param1);
    const response = ControllerResponse.create<CheckDto>(SUCCESS_RES, data);
    console.log("Controller response: %o", response);

    return response;
  }
}
