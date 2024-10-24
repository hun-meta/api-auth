import { Controller, Get, UsePipes, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { DefaultResDTO, HealthCheckResDTO } from '../dtos/default.dto';
import { SUCCESS_RES } from '../constants/response-info.constants';
import { ControllerResponse } from 'src/common/response/dto/controller-response.dto';
import { LoggerService } from 'src/common/logger/services/logger.service';
import { ApiTags } from '@nestjs/swagger';
import { CustomSwaggerDecorator } from 'src/common/decorator/swagger.decorator';
import { GET_DEFAUTL_RES_OPTS, GET_HEALTH_OPTS } from '../swagger/swagger.metadata';

@ApiTags('default')
@Controller()
@UsePipes(new ValidationPipe({ transform: true }))
export class AppController {
    constructor(
        private readonly appService: AppService,
        private readonly logger: LoggerService,
    ) {
        this.logger.setContext(AppController.name);
    }

    @Get()
    @CustomSwaggerDecorator(GET_DEFAUTL_RES_OPTS)
    async getDefaultResponse(): Promise<ControllerResponse<DefaultResDTO>> {
        const data = this.appService.getDefaultResponse();
        const response = ControllerResponse.create<DefaultResDTO>(SUCCESS_RES, data);

        return response;
    }

    @Get('v1/health')
    @CustomSwaggerDecorator(GET_HEALTH_OPTS)
    getHealth(): ControllerResponse<HealthCheckResDTO> {
        const data = this.appService.getHealth();
        const response = ControllerResponse.create<HealthCheckResDTO>(SUCCESS_RES, data);

        return response;
    }
}
