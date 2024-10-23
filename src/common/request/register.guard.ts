import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JWT_VERIFIED } from '../crypto/constants/response-info.constants';
import { AccountTokenService } from '../crypto/services/account-token.service';
import { MobileTokenService } from '../crypto/services/mobile-token.service';

@Injectable()
export class RegisterGuard implements CanActivate {

    constructor(
        private readonly accountTokenService: AccountTokenService,
        private readonly mobileTokenService: MobileTokenService
    ) {}

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const { accountToken, mobileToken } = this.extractTokens(request);
        
        const [accountPayload, mobilePayload] = this.verifyTokens(accountToken, mobileToken);
        
        this.validateTokenPayloads(accountPayload, mobilePayload, request.body);

        return true;
    }

    /**
     * Extract and validate tokens from request headers
     *
     * @param request - http request object
     * @returns token value
     */
    private extractTokens(request: any): { accountToken: string; mobileToken: string } {
        const accountTokenHeader = request.headers['account-token'];
        const mobileTokenHeader = request.headers['mobile-token'];

        if (!accountTokenHeader || !mobileTokenHeader) {
            throw new UnauthorizedException('Token header is missing');
        }

        const accountToken = this.extractBearerToken(accountTokenHeader);
        const mobileToken = this.extractBearerToken(mobileTokenHeader);

        if (!accountToken || !mobileToken) {
            throw new UnauthorizedException('Token is Empty');
        }

        return { accountToken, mobileToken };
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
     * Verify both account and mobile tokens
     * 
     * @param accountToken - account token value
     * @param mobileToken - mobile token value
     * @returns token payloads
     */
    private verifyTokens(accountToken: string, mobileToken: string): [any, any] {
        const [accountResult, accountPayload] = this.accountTokenService.verifyToken(accountToken);
        const [mobileResult, mobilePayload] = this.mobileTokenService.verifyToken(mobileToken);

        if (accountResult !== JWT_VERIFIED || mobileResult !== JWT_VERIFIED) {
            throw new UnauthorizedException('Invalid token');
        }

        return [accountPayload, mobilePayload];
    }

    /**
     * Validate token payloads against request body
     * 
     * @param accountPayload - account token payload
     * @param mobilePayload - mobile token payload
     * @param body - http request body to compare
     */
    private validateTokenPayloads(accountPayload: any, mobilePayload: any, body: any): void {
        const account = accountPayload.account || '';
        const mobile = mobilePayload.mobile || '';

        if (account !== body.account || mobile !== body.mobile) {
            throw new UnauthorizedException('Invalid token');
        }
    }

}
