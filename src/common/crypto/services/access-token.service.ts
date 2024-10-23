import { Injectable } from "@nestjs/common";
import { BaseTokenService } from "./base-token.service";
import { ConfigService } from "@nestjs/config";
import { KeyService } from "./key.service";
import { LoggerService } from "src/common/logger/services/logger.service";

@Injectable()
export class AccessTokenService extends BaseTokenService {
    constructor(
        protected readonly logger: LoggerService,
        protected readonly config: ConfigService,
        protected readonly keyService: KeyService
    ) {
        super('EX_ACCESS', 'ALGORITHM_ACCESS');
        this.setDependencies(this.logger, this.config, this.keyService);
    }

    /**
     * INFO: return access token
     *
     * @param issuer - Domain that issued token
     * @param subject - User who use this token
     * @param audience - Service that requested token
     * @returns access token.
     */
    createToken(issuer: string, subject: string, audience: string, identifier: string = ''): string {
        const payload = {};
        const options = { algorithm: this.algorithm, expiresIn: this.expiresIn, issuer, subject, audience };
        return this.signToken(payload, options);
    }
}
