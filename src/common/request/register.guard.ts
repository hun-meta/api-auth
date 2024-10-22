import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, SetMetadata } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TokenUtilityService } from '../crypto/services/token-utility.service';
import { JWT_VERIFIED } from '../crypto/constants/response-info.constants';

@Injectable()
export class RegisterGuard implements CanActivate {
    private readonly apiKey: string;

    constructor(
        private readonly configService: ConfigService,
        private readonly tokenUtility: TokenUtilityService
    ) {
        this.apiKey = this.configService.get<string>('ID_API_KEY');
    }

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
        const accountTokenValue = request.headers['account-token'];
        const mobileTokenValue = request.headers['mobile-token'];

        if (!accountTokenValue || !mobileTokenValue) {
            throw new UnauthorizedException('Token header is missing');
        }

        const accountToken = this.extractBearerToken(accountTokenValue);
        const mobileToken = this.extractBearerToken(mobileTokenValue);

        if (!accountToken || !mobileToken) {
            throw new UnauthorizedException('Token is Empty');
        }

        return { accountToken, mobileToken };
    }

    /**
     * Verify both account and mobile tokens
     * 
     * @param accountToken - account token value
     * @param mobileToken - mobile token value
     * @returns token payloads
     */
    private verifyTokens(accountToken: string, mobileToken: string): [any, any] {
        const [accountResult, accountPayload] = this.tokenUtility.verifyToken(accountToken);
        const [mobileResult, mobilePayload] = this.tokenUtility.verifyToken(mobileToken);

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
}
