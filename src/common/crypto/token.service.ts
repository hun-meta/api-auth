import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { EnvUndefinedError } from '../exception/errors';
import { LoggerService } from '../logger/logger.service';
import { KeyService } from './key.service';

interface TokenService {
    createToken(iss: string, sub: string, aud: string, identifier: string): string;
}

@Injectable()
export class AccessTokenService implements TokenService {
    private readonly privateKey: string;

    constructor(
        private readonly logger: LoggerService,
        private readonly config: ConfigService,
        private readonly keyService: KeyService
    ) {
        this.logger.setContext(AccessTokenService.name);
        this.privateKey = this.keyService.getPrivateKey();
    }

    /**
     * INFO: return access token
     *
     * @param iss - Domain that issued token
     * @param sub - User who use this token
     * @param aud - Service that requested token
     * @returns access token.
     */
    createToken(iss: string, sub: string, aud: string): string {
        const expiresIn = this.config.get<string>('EX_ACCESS');
        const payload = { iss, sub, aud };

        if (!expiresIn) {
            throw new EnvUndefinedError(['EX_ACCESS']);
        }

        return jwt.sign(payload, this.privateKey, { expiresIn });
    }
}

@Injectable()
export class RefreshTokenService implements TokenService {

    private readonly privateKey: string;

    constructor(
        private readonly logger: LoggerService,
        private readonly config: ConfigService,
        private readonly keyService: KeyService
    ) {
        this.logger.setContext(AccessTokenService.name);
        this.privateKey = this.keyService.getPrivateKey();
    }

    /**
     * INFO: return refresh token
     *
     * @param iss - Domain that issued token
     * @param sub - User who use this token
     * @param aud - Service that requested token
     * @param device_id - device semi unique id
     * @returns refresh token.
     */
    createToken(iss: string, sub: string, aud: string, device_id: string): string {
        const expiresIn = this.config.get<string>('EX_REFRESH');
        const payload = { iss, sub, aud, device_id };

        if (!expiresIn) {
            throw new EnvUndefinedError(['EX_REFRESH']);
        }

        return jwt.sign(payload, this.privateKey, { expiresIn });
    }
}

@Injectable()
export class AccountTokenService implements TokenService {

    private readonly privateKey: string;

    constructor(
        private readonly logger: LoggerService,
        private readonly config: ConfigService,
        private readonly keyService: KeyService
    ) {
        this.logger.setContext(AccountTokenService.name);
        this.privateKey = this.keyService.getPrivateKey();
    }

    /**
     * INFO: return account token for register
     *
     * @param iss - Domain that issued token
     * @param sub - User who use this token
     * @param aud - Service that requested token
     * @param account - login account
     * @returns account token.
     */
    createToken(iss: string, sub: string, aud: string, account: string): string {
        const expiresIn = this.config.get<string>('EX_REGISTER');
        const payload = { iss, sub, aud, account };

        if (!expiresIn) {
            throw new EnvUndefinedError(['EX_REGISTER']);
        }

        return jwt.sign(payload, this.privateKey, { expiresIn });
    }
}

@Injectable()
export class MobileTokenService implements TokenService {

    private readonly privateKey: string;

    constructor(
        private readonly logger: LoggerService,
        private readonly config: ConfigService,
        private readonly keyService: KeyService
    ) {
        this.logger.setContext(MobileTokenService.name);
        this.privateKey = this.keyService.getPrivateKey();
    }

    /**
     * INFO: return mobile token for register
     *
     * @param iss - Domain that issued token
     * @param sub - User who use this token
     * @param aud - Service that requested token
     * @param mobile - mobile
     * @returns mobile token.
     */
    createToken(iss: string, sub: string, aud: string, mobile: string): string {
        const expiresIn = this.config.get<string>('EX_REGISTER');
        const payload = { iss, sub, aud, mobile };

        if (!expiresIn) {
            throw new EnvUndefinedError(['EX_REGISTER']);
        }

        return jwt.sign(payload, this.privateKey, { expiresIn });
    }

    /**
     * INFO: return token for verify mobile
     *
     * @param iss - Domain that issued token
     * @param sub - User who use this token
     * @param aud - Service that requested token
     * @param mobile - mobile
     * @returns mobile token.
     */
    createVerifyToken(iss: string, sub: string, aud: string, mobile: string, ranNum: string): string {
        const jwt_secret = this.config.get<string>('JWT_MOBILE_SECRET') + ranNum;
        const expiresIn = this.config.get<string>('EX_MOBILE_VERIFY');
        const payload = { iss, sub, aud, mobile };

        if (!jwt_secret || !expiresIn) {
            throw new EnvUndefinedError(['JWT_MOBILE_SECRET', 'EX_MOBILE_VERIFY']);
        }

        return jwt.sign(payload, jwt_secret, { expiresIn });
    }
}