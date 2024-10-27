import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { MedicalwalletService } from './medicalwallet.service';
import { CheckAccountDTO, RegisterDTO, SendCodeDTO, VerifyCodeDTO } from '../dtos/request.dto';
import { CheckAccountResDTO, RegisterResDTO, SendCodeResDTO, VerifyCodeResDTO } from '../dtos/response.dto';
import { ControllerResponse } from 'src/common/response/dto/controller-response.dto';
import { CHECKED, REGISTERED, SENT_CODE, VERIFIED } from '../constants/response-info.constants';
import { LoggerService } from 'src/common/logger/services/logger.service';
import { CustomSwaggerDecorator } from 'src/common/decorator/swagger.decorator';
import { CHECK_ACCOUNT_OPTS, REGISTER_OPTS, SEND_CODE_OPTS, VERIFY_CODE_OPTS } from '../swagger/swagger.metadata';
import { RegisterGuard } from 'src/common/request/register.guard';
import { MobileGuard } from 'src/common/request/mobile.guard';

@Controller('v1/medicalwallet/')
@UsePipes(new ValidationPipe({ transform: true }))
export class MedicalwalletController {
    constructor(
        private readonly medicalwalletService: MedicalwalletService,
        private readonly logger: LoggerService,
    ) {
        this.logger.setContext(MedicalwalletController.name);
    }

    // Login ID Duplication Check
    @Post('users/check-account')
    @CustomSwaggerDecorator(CHECK_ACCOUNT_OPTS)
    async checkAccount(@Body() checkAccountDto: CheckAccountDTO): Promise<ControllerResponse<CheckAccountResDTO>> {
        const checkAccountResDto = await this.medicalwalletService.checkAccount(checkAccountDto);
        const response = ControllerResponse.create<CheckAccountResDTO>(CHECKED, checkAccountResDto);

        return response;
    }

    // Send verify code to Mobile for REGISTER
    @Post('mobile/send-code')
    @CustomSwaggerDecorator(SEND_CODE_OPTS)
    async sendCode(@Body() sendCodeDto: SendCodeDTO): Promise<ControllerResponse<SendCodeResDTO>> {
        const sendCodeResDto = await this.medicalwalletService.sendMobileCode(sendCodeDto);
        const response = ControllerResponse.create<SendCodeResDTO>(SENT_CODE, sendCodeResDto);

        return response;
    }

    // Verify Mobile owner by token and verification code
    @Post('mobile/verification')
    @UseGuards(MobileGuard)
    @CustomSwaggerDecorator(VERIFY_CODE_OPTS)
    verifyCode(@Body() verifyCodeDto: VerifyCodeDTO): ControllerResponse<VerifyCodeResDTO> {
        const verifyCodeResDto = this.medicalwalletService.getMobileToken(verifyCodeDto);
        const response = ControllerResponse.create<VerifyCodeResDTO>(VERIFIED, verifyCodeResDto);

        return response;
    }

    // Register Medical Wallet user
    @Post('users')
    @UseGuards(RegisterGuard)
    @CustomSwaggerDecorator(REGISTER_OPTS)
    async register(@Body() registerDto: RegisterDTO): Promise<ControllerResponse<RegisterResDTO>> {
        const registerResDto = await this.medicalwalletService.register(registerDto);
        const response = ControllerResponse.create<RegisterResDTO>(REGISTERED, registerResDto);

        return response;
    }
}
