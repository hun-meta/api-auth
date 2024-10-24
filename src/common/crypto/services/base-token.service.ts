import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { EnvUndefinedError } from '../../exception/errors';
import { LoggerService } from '../../logger/services/logger.service';
import { KeyService } from './key.service';
import { ResponseInfo } from 'src/common/response/types';
import { JWT_EXPIRED, JWT_INVALID, JWT_VERIFIED } from '../constants/response-info.constants';

interface TokenService {
    createToken(issuer: string, subject: string, audience: string, identifier?: string): string;
    verifyToken(token: string): [ResponseInfo, any];
}

export abstract class BaseTokenService implements TokenService {
    protected privateKey: string;
    protected publicKey: string;
    protected expiresIn: string;
    protected algorithm: string;
    protected logger: LoggerService;
    protected config: ConfigService;
    protected keyService: KeyService;

    constructor(
        protected readonly expiresInKey: string,
        protected readonly algorithmKey: string,
    ) {}

    protected setDependencies(logger: LoggerService, config: ConfigService, keyService: KeyService) {
        this.logger = logger;
        this.config = config;
        this.keyService = keyService;

        this.logger.setContext(this.constructor.name);
        this.privateKey = this.keyService.getPrivateKey();
        this.publicKey = this.keyService.getPublicKey();
        this.expiresIn = this.config.get<string>(this.expiresInKey);
        this.algorithm = this.config.get<string>(this.algorithmKey);

        this.validateEnvironmentVariables();
    }

    protected validateEnvironmentVariables(): void {
        if (!this.expiresIn || !this.algorithm) {
            throw new EnvUndefinedError([this.expiresInKey, this.algorithmKey]);
        }
    }

    abstract createToken(issuer: string, subject: string, audience: string, identifier?: string): string;

    verifyToken(token: string): [ResponseInfo, any] {
        const options = { algorithms: [this.algorithm] };

        try {
            const decoded = jwt.verify(token, this.publicKey, options);
            return [JWT_VERIFIED, decoded];
        } catch (error) {
            if (error instanceof Error) {
                switch (error.name) {
                    case 'TokenExpiredError':
                        return [JWT_EXPIRED, null];
                    case 'JsonWebTokenError':
                        return [JWT_INVALID, null];
                    default:
                        throw error;
                }
            }
            throw error;
        }
    }

    protected signToken(payload: any, options: jwt.SignOptions): string {
        return jwt.sign(payload, this.privateKey, options);
    }
}
