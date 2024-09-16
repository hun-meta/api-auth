import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { BaseResponse } from 'src/common/response/dto/base-response.dto';
import { DefaultDto } from '../dtos/default.dto';

// NOTE:
// 1. Routing
// 2. Request data collection and validation
// 3. Call Service
// 4. Send Response
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService
  ) {}

  // Default Path
  @Get(``)
  getDefaultResponse(): BaseResponse<DefaultDto> {
    return this.appService.getDefaultResponse();
  }

  // Health Check Path(for AWS ALB)
  @Get(`health`)
  getHealth(): BaseResponse<DefaultDto> {
    return this.appService.getHealth();
  }

}
