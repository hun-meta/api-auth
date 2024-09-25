import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { MedicalwalletService } from './medicalwallet.service';
import { RegisterDTO } from '../dtos/request.dto';
import { RegisterResDTO } from '../dtos/response.dto';
import { ControllerResponse } from 'src/common/response/dto/controller-response.dto';
import { REGISTERED } from '../types';
import { LoggerService } from 'src/common/logger/logger.service';

@Controller('v1/medicalwallet/')
@UsePipes(new ValidationPipe({transform: true}))
export class MedicalwalletController {
  constructor(
      private readonly medicalwalletService: MedicalwalletService,
      private readonly logger: LoggerService
  ) {
      this.logger.setContext(MedicalwalletController.name);
  }

  // TODO: Swagger 설정 및 회원 가입 로직 설계
  // 회원 가입
  @Post('users')
  register(@Body() registerDto: RegisterDTO) : ControllerResponse<RegisterResDTO> {
    
      this.logger.debug("/users: ", registerDto);

      const registerResDto = RegisterResDTO.create("", "");
      return ControllerResponse.create<RegisterResDTO>(REGISTERED, registerResDto);
  } 

}
