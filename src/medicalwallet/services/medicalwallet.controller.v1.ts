import { Body, Controller, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { MedicalwalletService } from './medicalwallet.service';
import { CheckAccountDto, RegisterDTO, SendCodeDto, VerifyCodeDto } from '../dtos/request.dto';
import { CheckAccountResDto, RegisterResDTO, SendCodeResDto, VerifyCodeResDto } from '../dtos/response.dto';
import { ControllerResponse } from 'src/common/response/dto/controller-response.dto';
import { CHECKED, REGISTERED, SENT_CODE, VERIFIED } from '../constants/response-info.constants';
import { LoggerService } from 'src/common/logger/services/logger.service';
import { CustomSwaggerDecorator } from 'src/common/decorator/swagger.decorator';
import { checkAccountOpts, sendCodeOpts, verifyCodeOpts } from '../swagger/swagger.metadata';
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
    @CustomSwaggerDecorator(checkAccountOpts)
    async checkAccount(@Body() checkAccountDto: CheckAccountDto): Promise<ControllerResponse<CheckAccountResDto>> {
        const checkAccountResDto = await this.medicalwalletService.checkAccount(checkAccountDto);
        const response = ControllerResponse.create<CheckAccountResDto>(CHECKED, checkAccountResDto);

        return response;
    }

    // Send verify code to Mobile for REGISTER
    @Post('mobile/send-code')
    @CustomSwaggerDecorator(sendCodeOpts)
    async sendCode(@Body() sendCodeDto: SendCodeDto): Promise<ControllerResponse<SendCodeResDto>> {
        const sendCodeResDto = await this.medicalwalletService.sendMobileCode(sendCodeDto);
        const response = ControllerResponse.create<SendCodeResDto>(SENT_CODE, sendCodeResDto);
    
        return response;
    }

    // Verify Mobile owner by token and verification code
    @Post('mobile/verification')
    @UseGuards(MobileGuard)
    @CustomSwaggerDecorator(verifyCodeOpts)
    verifyCode(@Body() verifyCodeDto: VerifyCodeDto): ControllerResponse<VerifyCodeResDto> {
        const verifyCodeResDto = this.medicalwalletService.getMobileToken(verifyCodeDto);
        const response = ControllerResponse.create<VerifyCodeResDto>(VERIFIED, verifyCodeResDto);

        return response;
    }

    // TODO: set Swagger options & implement business logic
    // Register Medical Wallet user
    @Post('users')
    @UseGuards(RegisterGuard)
    async register(@Body() registerDto: RegisterDTO): Promise<ControllerResponse<RegisterResDTO>> {
        this.logger.debug('/users: ', registerDto);

        const registerResDto = RegisterResDTO.create('', '');
        return ControllerResponse.create<RegisterResDTO>(REGISTERED, registerResDto);
    }
}
