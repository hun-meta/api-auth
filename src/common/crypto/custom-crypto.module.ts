import { Module } from '@nestjs/common';
import { AccessTokenService, AccountTokenService, MobileTokenService } from './token.service';
import { LoggerService } from '../logger/logger.service';
import { RandomService } from './random.service';
import { KeyService } from './key.service';
import { TokenUtilityService } from './token-utility.service';

@Module({
  providers: [
    KeyService,
    TokenUtilityService,
    AccessTokenService,
    AccountTokenService,
    MobileTokenService,
    LoggerService,
    RandomService,
],
  exports: [
    TokenUtilityService,
    AccessTokenService,
    AccountTokenService,
    MobileTokenService,
    RandomService,
  ]
})
export class CustomCryptoModule {}
