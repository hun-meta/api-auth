import { Controller } from '@nestjs/common';

@Controller('test')
export class TestController {
    constructor(
        private readonly appService: AppService,
        private readonly cls: ClsService
      ) {}
}
