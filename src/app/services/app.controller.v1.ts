import { Controller, Get, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { CheckUsePipeDto, DefaultDto, HealthCheckDto } from '../dtos/default.dto';
import { SUCCESS_RES } from '../types';
import { ControllerResponse } from 'src/common/response/dto/controller-response.dto';
import { IsString, IsOptional, IsNumber, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { LoggerService } from 'src/common/logger/logger.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CustomSwaggerDecorator } from 'src/common/swagger/swagger.decorator';
import { checkUsePipeOpts, getDefaultResponseOpts, getHealthOpts } from '../swagger/swagger.metadata';

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
@ApiTags('default')
@Controller()
@UsePipes(new ValidationPipe({transform: true}))
export class AppController {

  constructor(
    private readonly appService: AppService,
    private readonly logger: LoggerService
  ) {
    this.logger.setContext(AppController.name);
  }

  @Get()
  @CustomSwaggerDecorator(getDefaultResponseOpts)
  async getDefaultResponse(): Promise<ControllerResponse<DefaultDto>> {

    const data = this.appService.getDefaultResponse();
    const response = ControllerResponse.create<DefaultDto>(SUCCESS_RES, data);

    return response;
  }

  @Get('v1/health')
  @CustomSwaggerDecorator(getHealthOpts)
  getHealth(): ControllerResponse<HealthCheckDto> {
    const data = this.appService.getHealth();
    const response = ControllerResponse.create<HealthCheckDto>(SUCCESS_RES, data);

    return response;
  }

  @Get('v1/check')
  @CustomSwaggerDecorator(checkUsePipeOpts)
  checkUsePipe(@Query() query: CheckQueryDto): ControllerResponse<CheckUsePipeDto> {
    this.logger.debug("query", query);

    const data = this.appService.checkUsePipe(query.param1);
    const response = ControllerResponse.create<CheckUsePipeDto>(SUCCESS_RES, data);

    this.logger.debug("Controller response", response);

    return response;
  }
}
