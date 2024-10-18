import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from '../logger/logger.service';
import { JWT_EXPIRED, JWT_INVALID, JWT_VERIFIED } from './types';
import { ResponseInfo } from '../response/types';
import { KeyService } from './key.service';

@Injectable()
export class TokenUtilityService {
    private readonly publicKey: string;

    constructor(
        private readonly logger: LoggerService,
        private readonly config: ConfigService,
        private readonly keyService: KeyService
    ) {
        this.logger.setContext(TokenUtilityService.name);
        this.publicKey = this.keyService.getPublicKey();
    }

    /**
     * INFO: Decrypt and verify token
     *
     * @param token - JWT token to be verified
     * @returns ResponseInfo if verification is successful
     */
    verifyToken(token: string): ResponseInfo {
        try {
            const decoded = jwt.verify(token, this.publicKey, { algorithms: ['RS256'] });
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

        try {
            const decoded = jwt.verify(token, jwt_secret);
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
