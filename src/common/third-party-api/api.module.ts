import { Module } from '@nestjs/common';
import { LoggerService } from '../logger/logger.service';

@Module({
  providers: [
    LoggerService
],
  exports: [
],  // 다른 모듈에서 사용할 수 있도록 export
})
export class CustomCryptoModule {}
