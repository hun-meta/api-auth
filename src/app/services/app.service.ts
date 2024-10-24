import { Injectable } from '@nestjs/common';
import { DefaultResDTO, HealthCheckResDTO } from '../dtos/default.dto';

@Injectable()
export class AppService {
    constructor() {}

    getDefaultResponse(): DefaultResDTO {
        const welcomeStr = 'Welcome to API - Auth\n';
        const currentDate = new Date();
        const curDatetime = currentDate.toISOString();
        const responseStr = welcomeStr + curDatetime;

        return DefaultResDTO.create(responseStr);
    }

    getHealth(): HealthCheckResDTO {
        const currentDate = new Date();
        const curDatetime = currentDate.toISOString();

        return HealthCheckResDTO.create(curDatetime);
    }
}
