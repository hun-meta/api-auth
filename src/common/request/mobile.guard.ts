import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JWT_VERIFIED } from '../crypto/constants/response-info.constants';
import { MobileTokenService } from '../crypto/services/mobile-token.service';
import { LoggerService } from '../logger/services/logger.service';

@Injectable()
export class MobileGuard implements CanActivate {

    constructor(
        private readonly logger: LoggerService,
        private readonly mobileTokenService: MobileTokenService
    ) {
        this.logger.setContext(MobileGuard.name);
    }

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const verificationToken = this.extractTokens(request);
        
        const body = request.body;
        const mobile = body.mobile;
        const verificationCode = body.verificationCode;
        const payload = this.verifyToken(verificationToken, mobile, verificationCode);
        
        this.validateTokenPayload(payload, body);

        return true;
    }

    /**
     * Extract and validate token from request header
     *
     * @param request - http request object
     * @returns token value
     */
    private extractTokens(request: any): string {
        const verificationTokenHeader = request.headers['mobile-verification-token'];

        if (!verificationTokenHeader) {
            throw new UnauthorizedException('Token header is missing');
        }

        const verificationToken = this.extractBearerToken(verificationTokenHeader);

        if (!verificationToken) {
            throw new UnauthorizedException('Token is Empty');
        }

        return verificationToken;
    }

    /**
     * Extract token value from Bearer format
     *
     * @param token - Bearer token header value
     * @returns token value
     */
    private extractBearerToken(token: string): string {
        if (token.startsWith('Bearer ')) {
            return token.slice(7);
        } else {
            throw new UnauthorizedException(`Invalid token format`);
        }
    }

    /**
     * Verify mobile verification token
     * 
     * @param verificationToken - mobile verification token value
     * @returns token payload
     */
    private verifyToken(verificationToken: string, mobile: string, verificationCode: number): [any, any] {
        const [result, payload] = this.mobileTokenService.verifyMobileVerifyToken(verificationToken, mobile, verificationCode);

        if (result !== JWT_VERIFIED) {
            throw new UnauthorizedException('Invalid token');
        }

        return payload;
    }

    /**
     * Validate token payload against request body
     * 
     * @param payload - mobile verification token payload
     * @param body - http request body to compare
     */
    private validateTokenPayload(payload: any, body: any): void {
        const mobile = payload.mobile || '';

        if (mobile !== body.mobile) {
            throw new UnauthorizedException('Invalid token');
        }
    }

}
