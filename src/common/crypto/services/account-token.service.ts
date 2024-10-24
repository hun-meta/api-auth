import { Injectable } from '@nestjs/common';
import { BaseTokenService } from './base-token.service';
import { LoggerService } from 'src/common/logger/services/logger.service';
import { ConfigService } from '@nestjs/config';
import { KeyService } from './key.service';

@Injectable()
export class AccountTokenService extends BaseTokenService {
    constructor(
        protected readonly logger: LoggerService,
        protected readonly config: ConfigService,
        protected readonly keyService: KeyService,
    ) {
        super('EX_REGISTER', 'ALGORITHM_REGISTER');
        this.setDependencies(this.logger, this.config, this.keyService);
    }

    /**
     * INFO: return account token for register
     *
     * @param issuer - Domain that issued token
     * @param subject - User who use this token
     * @param audience - Service that requested token
     * @param account - login account to register
     * @returns account token.
     */
    createToken(issuer: string, subject: string, audience: string, account: string): string {
        const payload = { account };
        const options = { algorithm: this.algorithm, expiresIn: this.expiresIn, issuer, subject, audience };
        return this.signToken(payload, options);
    }
}
