import { Controller, Get } from '@nestjs/common';

@Controller('drive')
export class TestController {
    constructor(
    ) {}

    // Default Path
    @Get(``)
    getDefaultResponse(): string {
      return "drive hello";
    }
}
