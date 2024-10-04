import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class TokenUtilityService {
    constructor(private readonly logger: LoggerService, private readonly config: ConfigService) {
        this.logger.setContext(TokenUtilityService.name);
    }

    /**
     * INFO: Decrypt and verify token
     *
     * @param token - JWT token to be verified
     * @returns decoded payload if verification is successful
     */
    // verifyToken(token: string): [string|null, Error|null] {
    //     const jwt_secret = this.config.get<string>('JWT_SECRET');
    //     try {
    //         const decoded = jwt.verify(token, jwt_secret);
    //         this.logger.debug('Token verified successfully:', decoded);
    //         return decoded;
    //     } catch (error) {
    //         if (error.name === 'TokenExpiredError') {
    //             this.logger.error('Token expired at:', error.expiredAt);
    //         } else if (error.name === 'JsonWebTokenError') {
    //             this.logger.error('Invalid token:', error.message);
    //         } else {
    //             this.logger.error('Token verification failed:', error);
    //         }
    //         throw error;
    //     }
    // }
    
}
