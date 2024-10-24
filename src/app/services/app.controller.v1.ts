import { Controller, Get, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { CheckUsePipeDto, DefaultDto, HealthCheckDto } from '../dtos/default.dto';
import { SUCCESS_RES } from '../constants/response-info.constants';
import { ControllerResponse } from 'src/common/response/dto/controller-response.dto';
import { IsString, IsOptional, IsNumber, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { LoggerService } from 'src/common/logger/services/logger.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CustomSwaggerDecorator } from 'src/common/decorator/swagger.decorator';
import { CHECK_USEPIPE_OPTS, GET_DEFAUTL_RES_OPTS, GET_HEALTH_OPTS } from '../swagger/swagger.metadata';

class CheckQueryDto {
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    param1: number;

    @IsString()
    @IsOptional()
    param2?: string;
}

// NOTE:
// 1. Routing
// 2. Request data collection and validation
// 3. Call Service
// 4. Send Response
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
    async getDefaultResponse(): Promise<ControllerResponse<DefaultDto>> {
        const data = this.appService.getDefaultResponse();
        const response = ControllerResponse.create<DefaultDto>(SUCCESS_RES, data);

        return response;
    }

    @Get('v1/health')
    @CustomSwaggerDecorator(GET_HEALTH_OPTS)
    getHealth(): ControllerResponse<HealthCheckDto> {
        const data = this.appService.getHealth();
        const response = ControllerResponse.create<HealthCheckDto>(SUCCESS_RES, data);

        return response;
    }

    @Get('v1/check')
    @CustomSwaggerDecorator(CHECK_USEPIPE_OPTS)
    checkUsePipe(@Query() query: CheckQueryDto): ControllerResponse<CheckUsePipeDto> {
        this.logger.debug('query', query);

        const data = this.appService.checkUsePipe(query.param1);
        const response = ControllerResponse.create<CheckUsePipeDto>(SUCCESS_RES, data);

        this.logger.debug('Controller response', response);

        return response;
    }
}
