import { Body, Controller, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { MedicalwalletService } from './medicalwallet.service';
import { CheckAccountDto, RegisterDTO, SendCodeDto } from '../dtos/request.dto';
import { CheckAccountResDto, RegisterResDTO, SendCodeResDto } from '../dtos/response.dto';
import { ControllerResponse } from 'src/common/response/dto/controller-response.dto';
import { CHECKED, REGISTERED, SENT_CODE } from '../constants/response-info.constants';
import { LoggerService } from 'src/common/logger/services/logger.service';
import { CustomSwaggerDecorator } from 'src/common/decorator/swagger.decorator';
import { checkAccountOpts, sendCodeOpts } from '../swagger/swagger.metadata';

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

    // TODO: Swagger 설정
    // 회원 가입
    @Post('users')
    register(@Body() registerDto: RegisterDTO): ControllerResponse<RegisterResDTO> {
        this.logger.debug('/users: ', registerDto);

        const registerResDto = RegisterResDTO.create('', '');
        return ControllerResponse.create<RegisterResDTO>(REGISTERED, registerResDto);
    }
}
