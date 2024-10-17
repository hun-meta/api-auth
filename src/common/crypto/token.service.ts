import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { EnvUndefinedError } from '../exception/errors';
import { LoggerService } from '../logger/logger.service';

interface TokenService {
    createToken(iss: string, sub: string, aud: string, identifier: string): string;
}

@Injectable()
export class AccessTokenService implements TokenService {
    constructor(private readonly logger: LoggerService, private readonly config: ConfigService) {
        this.logger.setContext(AccessTokenService.name);
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
        const jwt_secret = this.config.get<string>('JWT_SECRET');
        const expiresIn = this.config.get<string>('EX_ACCESS');
        const payload = { iss, sub, aud };

        if (!jwt_secret || !expiresIn) {
            throw new EnvUndefinedError(['JWT_SECRET', 'EX_ACCESS']);
        }

        return jwt.sign(payload, jwt_secret, { expiresIn });
    }
}

@Injectable()
export class RefreshTokenService implements TokenService {
    constructor(private readonly logger: LoggerService, private readonly config: ConfigService) {
        this.logger.setContext(AccessTokenService.name);
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
        const jwt_secret = this.config.get<string>('JWT_SECRET');
        const expiresIn = this.config.get<string>('EX_REFRESH');
        const payload = { iss, sub, aud, device_id };

        if (!jwt_secret || !expiresIn) {
            throw new EnvUndefinedError(['JWT_SECRET', 'EX_REFRESH']);
        }

        return jwt.sign(payload, jwt_secret, { expiresIn });
    }
}

@Injectable()
export class AccountTokenService implements TokenService {
    constructor(private readonly logger: LoggerService, private readonly config: ConfigService) {
        this.logger.setContext(AccountTokenService.name);
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
        const jwt_secret = this.config.get<string>('JWT_SECRET');
        const expiresIn = this.config.get<string>('EX_REGISTER');
        const payload = { iss, sub, aud, account };

        if (!jwt_secret || !expiresIn) {
            throw new EnvUndefinedError(['JWT_SECRET', 'EX_REGISTER']);
        }

        return jwt.sign(payload, jwt_secret, { expiresIn });
    }
}

@Injectable()
export class MobileTokenService implements TokenService {
    constructor(private readonly logger: LoggerService, private readonly config: ConfigService) {
        this.logger.setContext(MobileTokenService.name);
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
        const jwt_secret = this.config.get<string>('JWT_SECRET');
        const expiresIn = this.config.get<string>('EX_REGISTER');
        const payload = { iss, sub, aud, mobile };

        if (!jwt_secret || !expiresIn) {
            throw new EnvUndefinedError(['JWT_SECRET', 'EX_REGISTER']);
        }

        return jwt.sign(payload, jwt_secret, { expiresIn });
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
        const jwt_secret = this.config.get<string>('JWT_SECRET') + ranNum;
        const expiresIn = this.config.get<string>('EX_MOBILE_VERIFY');
        const payload = { iss, sub, aud, mobile };

        if (!jwt_secret || !expiresIn) {
            throw new EnvUndefinedError(['JWT_SECRET', 'EX_MOBILE_VERIFY']);
        }

        return jwt.sign(payload, jwt_secret, { expiresIn });
    }
}