import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import axios, { AxiosError, AxiosResponse } from 'axios';
import { LoggerService } from "src/common/logger/services/logger.service";
import { BaseResponse } from "src/common/response/dto/base-response.dto";
import { SendSmsDto } from "./dtos/request.dto";
import { SendSmsResDto } from "./dtos/response.dto";
import { validate } from "class-validator";
import { ApiMessageException } from "./ApiMessageException";
import { GlobalErrorDto } from "src/common/exception/dto";

@Injectable()
export class MessageService{

    private apiMessageUrl: string // API-MESSAGE Server URL

    constructor(
        private readonly logger: LoggerService,
        private readonly configService: ConfigService
    ) {
        this.apiMessageUrl = this.configService.get<string>('API_MESSAGE_URL') as string;
        this.logger.setContext(MessageService.name);
    }

    // send sms by API-Message
    async sendSMS(number: string, message: string): Promise<SendSmsResDto> {

        const requestBody = SendSmsDto.create(number, message);
        const errors = await validate(requestBody);
        if (errors.length > 0) {
            throw new InternalServerErrorException(`Validation failed: ${errors.map(err => Object.values(err.constraints)).join(', ')}`);
        }
        const headers = {
            Authorization: `Bearer ` + this.configService.get<string>('MESSAGE_API_KEY')
        };

        try{
            const result = await axios.post<BaseResponse<SendSmsResDto>>(`${this.apiMessageUrl}/v1/sms`, requestBody, { headers });
            return result.data.data;
        }catch(error){
            if(error instanceof AxiosError){
                const response: AxiosResponse<BaseResponse<GlobalErrorDto>> = error.response;
                const data: BaseResponse<GlobalErrorDto> = response.data;
                const status = error.status || 500;
                const requestId = data.requestId || 'undefined';
                const errMessage = data.data.message || error.message;

                throw new ApiMessageException(status, requestId, errMessage);
            }
            throw error;
        }

    }
}

