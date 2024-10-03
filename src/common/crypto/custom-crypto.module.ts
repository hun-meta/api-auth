import { Module } from '@nestjs/common';
import { AccessTokenService, AccountTokenService, MobileTokenService } from './token.service';
import { LoggerService } from '../logger/logger.service';

@Module({
  providers: [
    AccessTokenService,
    AccountTokenService,
    MobileTokenService,
    LoggerService
],
  exports: [
    AccessTokenService,
    AccountTokenService,
    MobileTokenService,
],  // 다른 모듈에서 사용할 수 있도록 export
})
export class CustomCryptoModule {}
