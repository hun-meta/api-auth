import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { LoggerService } from "src/common/logger/logger.service";
import { API } from "../api";
import { EnvUndefinedError } from "src/common/exception/errors";
import { BaseResponse } from "src/common/response/dto/base-response.dto";
import { SendSmsDto } from "./dtos/request.dto";
import { ErrorResDto, SendSmsResDto } from "./dtos/response.dto";

@Injectable()
export class MessageService extends API {
    constructor(
        private readonly logger: LoggerService,
        private readonly configService: ConfigService
    ) {
        super();
        const smsServiceUrl = this.configService.get<string>('SMS_SERVICE_URL') as string;
        this.initialBaseUrl(smsServiceUrl);
        this.logger.setContext(MessageService.name);
    }

    // TODO: do this after creating API-Message Server "/sms API"
    // send sms
    async sendSMS(number: string, message: string): Promise<[BaseResponse<any>, Error]> {

        const body = SendSmsDto.create(number, message);
        const postConfig = this.createPostConfig('/v1/sms', body);

        try{
            const result = this.request<BaseResponse<SendSmsResDto>>(postConfig);
        }catch(error){
            // 실패하면(200번대가 아니면) ErrorResDto 
            if(error instanceof AxiosError){
                const axiosError = error as AxiosError;
                const errorStatus = axiosError.status;
                const resData = axiosError.response?.data as BaseResponse<ErrorResDto>;
                const data: ErrorResDto = resData.data as ErrorResDto;
                switch (errorStatus) {
                }
            }
        }

    }


    /**
     * INFO: http request method
     *
     * @param config - Axios config object for HTTP request
     * @returns Axios HTTP Response
     */
    protected async request<T = BaseResponse<SendSmsResDto>>(
      config: AxiosRequestConfig
    ): Promise<AxiosResponse<T>> {
        if (!config.headers) {
            config.headers = {};
        }

        if (!config.headers['Authorization']) {
            const api_key = this.configService.get<string>('SMS_API_KEY');
            if (!api_key) {
                throw new EnvUndefinedError(['SMS_API_KEY']);
            }
            config.headers['Authorization'] = `Bearer ${api_key}`;
        } 

        try {
            const response = await this.axiosInstance.request<T>(config);
            return response;
        } catch (error) {
            throw error;
        }
    }
}

