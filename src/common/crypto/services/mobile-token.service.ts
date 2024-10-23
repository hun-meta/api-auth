import { Injectable } from "@nestjs/common";
import * as jwt from 'jsonwebtoken';
import { BaseTokenService } from "./base-token.service";
import { LoggerService } from "src/common/logger/services/logger.service";
import { ConfigService } from "@nestjs/config";
import { KeyService } from "./key.service";
import { EnvUndefinedError } from "src/common/exception/errors";
import { ResponseInfo } from "src/common/response/types";
import { JWT_EXPIRED, JWT_INVALID, JWT_VERIFIED } from "../constants/response-info.constants";

@Injectable()
export class MobileTokenService extends BaseTokenService {
    constructor(
        protected readonly logger: LoggerService,
        protected readonly config: ConfigService,
        protected readonly keyService: KeyService
    ) {
        super('EX_REGISTER', 'ALGORITHM_REGISTER');
        this.setDependencies(this.logger, this.config, this.keyService);
    }

    /**
     * INFO: return mobile token for register
     *
     * @param issuer - Domain that issued token
     * @param subject - User who use this token
     * @param audience - Service that requested token
     * @param mobile - mobile to register
     * @returns mobile token.
     */
    createToken(issuer: string, subject: string, audience: string, mobile: string): string {
        const payload = { mobile };
        const options = { algorithm: this.algorithm, expiresIn: this.expiresIn, issuer, subject, audience };
        return this.signToken(payload, options);
    }

    /**
     * INFO: return token for verify mobile
     *
     * @param issuer - Domain that issued token
     * @param subject - User who use this token
     * @param audience - Service that requested token
     * @param mobile - mobile
     * @returns mobile token.
     */
    createVerifyToken(issuer: string, subject: string, audience: string, mobile: string, ranNum: string): string {
        const jwt_secret = this.config.get<string>('JWT_MOBILE_SECRET') + ranNum;
        const expiresIn = this.config.get<string>('EX_MOBILE_VERIFY');
        const algorithm = this.config.get<string>('ALGORITHM_MOBILE_VERIFY');
        
        if (!jwt_secret || !expiresIn || !algorithm) {
            throw new EnvUndefinedError(['JWT_MOBILE_SECRET', 'EX_MOBILE_VERIFY', 'ALGORITHM_MOBILE_VERIFY']);
        }

        const payload = { mobile };
        const options = { algorithm, expiresIn, issuer, subject, audience };

        return jwt.sign(payload, jwt_secret, options);
    }

    /**
     * INFO: Decrypt and verify mobile verify token
     *
     * @param token - JWT token to be verified
     * @param mobile - mobile phone number to verify
     * @param ranNum - verify code from mobile phone
     * @returns ResponseInfo if verification is successful
     */
    verifyMobileVerifyToken(token: string, mobile: string, ranNum: number): ResponseInfo {
        const jwt_secret = this.config.get<string>('JWT_MOBILE_SECRET') + ranNum.toString();
        const algorithm = this.config.get<string>('ALGORITHM_MOBILE_VERIFY');

        if (!jwt_secret || !algorithm) {
            throw new EnvUndefinedError(['JWT_MOBILE_SECRET', 'ALGORITHM_MOBILE_VERIFY']);
        }

        const options = { algorithms: [ algorithm ] };

        try {
            const decoded = jwt.verify(token, jwt_secret, options);
            if(decoded.mobile !== mobile){
                return JWT_INVALID;
            }
            return JWT_VERIFIED;
        } catch (error) {
            if(error instanceof Error){
                switch(error.name){
                    case 'TokenExpiredError':
                        return JWT_EXPIRED;
                    case 'JsonWebTokenError':
                        return JWT_INVALID;
                    default:
                        throw error;
                }
            }
            throw error;
        }
    }
}