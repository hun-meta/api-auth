import { Global, Module } from '@nestjs/common';
import { AccessTokenService, AccountTokenService, MobileTokenService } from './services/token.service';
import { RandomService } from './services/random.service';
import { KeyService } from './services/key.service';
import { TokenUtilityService } from './services/token-utility.service';

@Global()
@Module({
  providers: [
    KeyService,
    TokenUtilityService,
    AccessTokenService,
    AccountTokenService,
    MobileTokenService,
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
