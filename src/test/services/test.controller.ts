import { Controller, Get } from '@nestjs/common';
import { TestService } from './test.service';
import { ClsService } from 'nestjs-cls';

@Controller('test')
export class TestController {
    constructor(
        private readonly appService: TestService,
        private readonly cls: ClsService
    ) {}

    // Default Path
    @Get(``)
    getDefaultResponse(): string {
      return "test hello";
    }
}
