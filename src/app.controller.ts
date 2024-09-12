import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ClsService } from 'nestjs-cls';

// NOTE:
// 1. Routing
// 2. Request data collection and validation
// 3. Call Service
// 4. Send Response
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly cls: ClsService
  ) {}

  // Health Check Path(for AWS ALB)
  @Get(``)
  getDefaultResponse(): string {

    const requestId = this.cls.get('requestId');

    console.log("Get Request By App Controller: %o", requestId);

    const currentDate = new Date();
    const curDatetime = `Date and Time: ${currentDate.toLocaleString()}`;
    const responseStr = `API for Medical-Wallet Working\n` + curDatetime;

    return responseStr;
  }

  // Health Check Path(for AWS ALB)
  @Get(`health`)
  getHealth(): string {

    const currentDate = new Date();
    const curDatetime = `Date and Time: ${currentDate.toLocaleString()}`;

    return curDatetime;
  }

}
