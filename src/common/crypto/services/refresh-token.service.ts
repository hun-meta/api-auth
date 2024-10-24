import { Injectable } from '@nestjs/common';
import { BaseTokenService } from './base-token.service';
import { LoggerService } from 'src/common/logger/services/logger.service';
import { ConfigService } from '@nestjs/config';
import { KeyService } from './key.service';

@Injectable()
export class RefreshTokenService extends BaseTokenService {
    constructor(
        protected readonly logger: LoggerService,
        protected readonly config: ConfigService,
        protected readonly keyService: KeyService,
    ) {
        super('EX_REFRESH', 'ALGORITHM_REFRESH');
        this.setDependencies(this.logger, this.config, this.keyService);
    }

    /**
     * INFO: return refresh token
     *
     * @param issuer - Domain that issued token
     * @param subject - User who use this token
     * @param audience - Service that requested token
     * @param device_id - device semi unique id
     * @returns refresh token.
     */
    createToken(issuer: string, subject: string, audience: string, device_id: string): string {
        const payload = { device_id };
        const options = { algorithm: this.algorithm, expiresIn: this.expiresIn, issuer, subject, audience };
        return this.signToken(payload, options);
    }
}
