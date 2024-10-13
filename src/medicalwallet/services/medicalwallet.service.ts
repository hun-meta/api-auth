import { Injectable } from '@nestjs/common';
import { CheckAccountDto } from '../dtos/request.dto';
import { CheckAccountResDto } from '../dtos/response.dto';
import { UsersMWRepository } from 'src/orm/repositories/users_medicalwallet.repository';
import { TypeORMError } from 'typeorm';
import { DatabaseException } from 'src/orm/DatabaseException';
import { LoggerService } from 'src/common/logger/logger.service';
import { AccountTokenService } from 'src/common/crypto/token.service';
import { ConfigService } from '@nestjs/config';
import { MessageService } from 'src/common/third-party-api/api-message/message.service';

@Injectable()
export class MedicalwalletService {
    constructor(
        private readonly logger: LoggerService,
        private readonly config: ConfigService,
        private readonly accountService: AccountTokenService,
        private readonly usersMWRepository: UsersMWRepository,
        private readonly messageService: MessageService
    ) {
        this.logger.setContext(MedicalwalletService.name);
    }

    // Check Medical-Wallet login account for Register
    async checkAccount(checkAccountDto: CheckAccountDto): Promise<CheckAccountResDto> {
        try {
            let available: boolean = false;
            let account_token: string = '';

            const user = await this.usersMWRepository.findByAccount(checkAccountDto.account);
            if (!user) {
                available = true;
                account_token = this.accountService.createToken(this.config.get<string>('ISSUER'), 'unspecified', this.config.get<string>('MW'), checkAccountDto.account);
            }

            return CheckAccountResDto.create(available, account_token);
        } catch (error) {
            if (error instanceof TypeORMError) {
                throw new DatabaseException(error);
            }
            throw error;
        }
    }

    // TODO: keep going
    // Send verify Code to mobile & create verifyToken for Register
    async sendMobileCode(checkAccountDto: CheckAccountDto): Promise<SendMobileResDto> {
        // 1. create random code
        // 2. create verify token with random code
        // 3. send code to mobile
        // 4. response with verify token
    }
}
