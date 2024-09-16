import { Controller, Get, UsePipes, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { DefaultDto, HealthCheckDto } from '../dtos/default.dto';
import { SUCCESS_RES } from '../types';
import { ControllerResponse } from 'src/common/response/interface/controller-response.interface';

// NOTE:
// 1. Routing
// 2. Request data collection and validation
// 3. Call Service
// 4. Send Response
@Controller()
@UsePipes(new ValidationPipe({transform: true}))
export class AppController {
  constructor(
    private readonly appService: AppService
  ) {}

  // Default Path
  @Get()
  getDefaultResponse(): ControllerResponse<DefaultDto> {
    const data = this.appService.getDefaultResponse();
    const response: ControllerResponse<DefaultDto> = { 
      info: SUCCESS_RES,
      data: data
    };
    console.log("Controller response: %o", response);
    return response;
  }

  // AWS Health Check Path
  @Get('health')
  getHealth(): ControllerResponse<HealthCheckDto> {
    const data = this.appService.getHealth();
    const response = { 
      info: SUCCESS_RES,
      data: data
    };
    console.log("Controller response: %o", response);
    return response;
  }

}
