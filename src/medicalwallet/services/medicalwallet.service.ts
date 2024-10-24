import { Injectable } from '@nestjs/common';
import { CheckAccountDTO, SendCodeDTO, VerifyCodeDTO } from '../dtos/request.dto';
import { CheckAccountResDTO, SendCodeResDTO, VerifyCodeResDTO } from '../dtos/response.dto';
import { UsersMWRepository } from 'src/orm/repositories/users_medicalwallet.repository';
import { TypeORMError } from 'typeorm';
import { DatabaseException } from 'src/orm/DatabaseException';
import { LoggerService } from 'src/common/logger/services/logger.service';
import { AccountTokenService } from 'src/common/crypto/services/account-token.service';
import { MobileTokenService } from 'src/common/crypto/services/mobile-token.service';
import { ConfigService } from '@nestjs/config';
import { MessageService } from 'src/api/internal-services/api-message/message.service';
import { RandomService } from 'src/common/crypto/services/random.service';

@Injectable()
export class MedicalwalletService {
    constructor(
        private readonly logger: LoggerService,
        private readonly config: ConfigService,
        private readonly accountService: AccountTokenService,
        private readonly mobileService: MobileTokenService,
        private readonly randomService: RandomService,
        private readonly usersMWRepository: UsersMWRepository,
        private readonly messageService: MessageService,
    ) {
        this.logger.setContext(MedicalwalletService.name);
    }

    // Check Medical-Wallet login account for Register
    async checkAccount(checkAccountDto: CheckAccountDTO): Promise<CheckAccountResDTO> {
        try {
            let available: boolean = false;
            let accountToken: string = '';

            const user = await this.usersMWRepository.findByAccount(checkAccountDto.account);
            if (!user) {
                available = true;
                accountToken = this.accountService.createToken(this.config.get<string>('ISSUER'), 'unspecified', this.config.get<string>('MW'), checkAccountDto.account);
            }

            return CheckAccountResDTO.create(available, accountToken);
        } catch (error) {
            if (error instanceof TypeORMError) {
                throw new DatabaseException(error);
            }
            throw error;
        }
    }

    // Send verify Code to mobile & create verifyToken for Register
    async sendMobileCode(sendCodeDto: SendCodeDTO): Promise<SendCodeResDTO> {

        // 1. create random code
        const issuer = this.config.get<string>('ISSUER');
        const audience = this.config.get<string>('MW').replace('_', ' ');
        const subject = 'unspecified';
        const mobile = sendCodeDto.mobile;
        const code = this.randomService.getRandNum(6);

        // 2. create verify token with random code
        const verificationToken = this.mobileService.createVerifyToken(issuer, subject, audience, mobile, code);

        // 3. send code to mobile
        const message = `[${audience}]\n회원가입 인증번호는 [${code}]입니다.`
        const _ = await this.messageService.sendSMS(mobile, message);

        // 4. response with verify token
        const sendCodeResDto = SendCodeResDTO.create(verificationToken);
        return sendCodeResDto;
    }

    // create & return mobile token for Register
    getMobileToken(verifyCodeDto: VerifyCodeDTO): VerifyCodeResDTO {
        
        const issuer = this.config.get<string>('ISSUER');
        const audience = this.config.get<string>('MW').replace('_', ' ');
        const subject = 'unspecified';
        const mobile = verifyCodeDto.mobile;

        const mobileToken = this.mobileService.createToken(issuer, subject, audience, mobile);
        const verifyCodeResDto = VerifyCodeResDTO.create(mobileToken);

        return verifyCodeResDto;
    }
}
