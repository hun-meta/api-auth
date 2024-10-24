import { Global, Module } from '@nestjs/common';
import { RandomService } from './services/random.service';
import { KeyService } from './services/key.service';
import { AccessTokenService } from './services/access-token.service';
import { AccountTokenService } from './services/account-token.service';
import { MobileTokenService } from './services/mobile-token.service';

@Global()
@Module({
    providers: [KeyService, AccessTokenService, AccountTokenService, MobileTokenService, RandomService],
    exports: [AccessTokenService, AccountTokenService, MobileTokenService, RandomService],
})
export class CustomCryptoModule {}
