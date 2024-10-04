import { Injectable } from '@nestjs/common';
import { CheckAccountDto } from '../dtos/request.dto';
import { CheckAccountResDto } from '../dtos/response.dto';
import { UsersMWRepository } from 'src/orm/repositories/users_medicalwallet.repository';
import { TypeORMError } from 'typeorm';
import { DatabaseException } from 'src/orm/DatabaseException';
import { LoggerService } from 'src/common/logger/logger.service';
import { AccountTokenService } from 'src/common/crypto/token.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MedicalwalletService {
    constructor(
        private readonly logger: LoggerService,
        private readonly config: ConfigService,
        private readonly accountService: AccountTokenService,
        private readonly usersMWRepository: UsersMWRepository
    ) {
        this.logger.setContext(MedicalwalletService.name);
    }

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
}
