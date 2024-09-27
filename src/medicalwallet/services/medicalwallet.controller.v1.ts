import { Body, Controller, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { MedicalwalletService } from './medicalwallet.service';
import { CheckAccountDto, RegisterDTO } from '../dtos/request.dto';
import { CheckAccountResDto, RegisterResDTO } from '../dtos/response.dto';
import { ControllerResponse } from 'src/common/response/dto/controller-response.dto';
import { CHECKED, REGISTERED } from '../types';
import { LoggerService } from 'src/common/logger/logger.service';
import { CustomUndefinedError } from 'src/common/exception/errors';

@Controller('v1/medicalwallet/')
@UsePipes(new ValidationPipe({transform: true}))
export class MedicalwalletController {
  constructor(
      private readonly medicalwalletService: MedicalwalletService,
      private readonly logger: LoggerService
  ) {
      this.logger.setContext(MedicalwalletController.name);
  }

    // TODO: Swagger 설정
    // 로그인 계정(ID) 중복확인
    @Post('users/account')
    async checkAccount(@Query() checkAccountDto: CheckAccountDto) : Promise<ControllerResponse<CheckAccountResDto>>{

        try{
            const checkAccountResDto = await this.medicalwalletService.checkAccount(checkAccountDto);
            const cResponse = ControllerResponse.create<CheckAccountResDto>(CHECKED, checkAccountResDto);

            return cResponse;
        }catch(error){
            if(error instanceof Error){ // Exception instance 확인을 통해서 응답 처리해줄지 throw할지 결정
                throw error;
            }else{
                throw new CustomUndefinedError(error);
            }
        }
    }

  // TODO: Swagger 설정
  // 회원 가입
  @Post('users')
  register(@Body() registerDto: RegisterDTO) : ControllerResponse<RegisterResDTO> {
    
      this.logger.debug("/users: ", registerDto);

      const registerResDto = RegisterResDTO.create("", "");
      return ControllerResponse.create<RegisterResDTO>(REGISTERED, registerResDto);
  } 

}
