import { Module } from '@nestjs/common';
import { AccessTokenService, AccountTokenService, MobileTokenService } from './token.service';
import { LoggerService } from '../logger/logger.service';
import { RandomService } from './random.service';

@Module({
  providers: [
    AccessTokenService,
    AccountTokenService,
    MobileTokenService,
    LoggerService,
    RandomService,
],
  exports: [
    AccessTokenService,
    AccountTokenService,
    MobileTokenService,
    RandomService,
  ]
})
export class CustomCryptoModule {}
