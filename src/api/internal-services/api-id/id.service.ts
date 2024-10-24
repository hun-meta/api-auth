import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { LoggerService } from 'src/common/logger/services/logger.service';
import { BaseResponse } from 'src/common/response/dto/base-response.dto';
import { GlobalErrorDto } from 'src/common/exception/dto';
import { GenTableIdResDto } from './dtos/response.dto';
import { ApiIdException } from './api-id.exception';

@Injectable()
export class IdService {
    private apiIdUrl: string; // API-MESSAGE Server URL

    constructor(
        private readonly logger: LoggerService,
        private readonly configService: ConfigService,
    ) {
        this.apiIdUrl = this.configService.get<string>('API_ID_URL') as string;
        this.logger.setContext(IdService.name);
    }

    // generate Table ID by API-ID
    async generateTableID(tableName: string): Promise<GenTableIdResDto> {
        if (tableName.length > 0) {
            throw new InternalServerErrorException(
                `Validation failed: table name`,
            );
        }

        const headers = {
            Authorization: `Bearer ` + this.configService.get<string>('ID_API_KEY'),
        };

        try {
            const result = await axios.post<BaseResponse<GenTableIdResDto>>(`${this.apiIdUrl}/v1/${tableName}/ids`, {
                headers,
            });
            return result.data.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                const response: AxiosResponse<BaseResponse<GlobalErrorDto>> = error.response;
                const data: BaseResponse<GlobalErrorDto> = response.data;
                const status = error.status || 500;
                const requestId = data.requestId || 'undefined';
                const errMessage = data.data.message || error.message;

                throw new ApiIdException(status, requestId, errMessage);
            }
            throw error;
        }
    }
}
