import { Body, Controller, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { MedicalwalletService } from './medicalwallet.service';
import { CheckAccountDto, RegisterDTO, SendCodeDto } from '../dtos/request.dto';
import { CheckAccountResDto, RegisterResDTO } from '../dtos/response.dto';
import { ControllerResponse } from 'src/common/response/dto/controller-response.dto';
import { CHECKED, REGISTERED } from '../types';
import { LoggerService } from 'src/common/logger/logger.service';
import { CustomSwaggerDecorator } from 'src/common/swagger/swagger.decorator';
import { checkAccountOpts } from '../swagger/swagger.metadata';
import { ErrorHandlerService } from 'src/common/exception/handler/error-handler.service';

@Controller('v1/medicalwallet/')
@UsePipes(new ValidationPipe({ transform: true }))
export class MedicalwalletController {
    constructor(
        private readonly medicalwalletService: MedicalwalletService,
        private readonly logger: LoggerService,
        private readonly errHandler: ErrorHandlerService,
    ) {
        this.logger.setContext(MedicalwalletController.name);
    }

    // Login ID Duplication Check
    @Post('users/check-account')
    @CustomSwaggerDecorator(checkAccountOpts)
    async checkAccount(@Body() checkAccountDto: CheckAccountDto): Promise<ControllerResponse<CheckAccountResDto>> {
        try {
            const checkAccountResDto = await this.medicalwalletService.checkAccount(checkAccountDto);
            const cResponse = ControllerResponse.create<CheckAccountResDto>(CHECKED, checkAccountResDto);

            return cResponse;
        } catch (error) {
            throw this.errHandler.handleError(error);
        }
    }

    // TODO: Swagger 설정, api 구현
    // Send verify code to Mobile for REGISTER
    @Post('mobile/send-code')
    // @CustomSwaggerDecorator(checkAccountOpts)
    async sendCode(@Body() sendCodeDto: SendCodeDto): Promise<ControllerResponse<CheckAccountResDto>> {
        try {
            const checkAccountResDto = await this.medicalwalletService.checkAccount(sendCodeDto);
            const cResponse = ControllerResponse.create<CheckAccountResDto>(CHECKED, checkAccountResDto);
    
            return cResponse;
        } catch (error) {
            throw this.errHandler.handleError(error);
        }
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
