import { Module } from '@nestjs/common';
import { TestController } from './services/test.controller';
import { TestService } from './services/test.service';

@Module({
  controllers: [TestController],
  providers: [TestService],
})
export class TestModule {}
