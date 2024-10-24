import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { GlobalErrorDto } from 'src/common/exception/dto';
import { ClsService } from 'nestjs-cls';
import { LoggerService } from 'src/common/logger/services/logger.service';
import { BaseResponse } from 'src/common/response/dto/base-response.dto';
import { ResponseInfo } from 'src/common/response/types';
import { InternalServiceException } from './exceptions';
import { ApiMessageException } from './api-message/ApiMessageException';
import { INTERNAL_SERVER_ERROR } from 'src/common/exception/constants/http.response-info.constants';
import { INTERNAL_SERVICE_EXCEPTION } from './constants/exception-name.constants';
import { INTERNAL_SERVICE_ERROR, MESSAGE_SERVICE_ERROR } from './constants/response-info.constants';

// INFO: 전역 내부 서비스 예외 필터
@Catch(InternalServiceException)
export class InternalServiceExceptionFilter implements ExceptionFilter {
    constructor(
        private readonly cls: ClsService,
        private readonly logger: LoggerService,
    ) {
        this.logger.setContext(InternalServiceExceptionFilter.name);
    }

    catch(exception: InternalServiceException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const requestId = this.cls.get('requestId') ?? 'Request ID undefined';

        let errName = 'InternalServiceException';
        let info = null;
        let errMessage = '';

        [info, errMessage] = getExceptionInfo(exception);

        this.logger.error(
            `Request Error - ID: ${requestId}, ${errName}: ${exception.message}, service request ID: ${exception.requestId}`,
            exception.stack || exception.message || '',
        );

        const errDto = GlobalErrorDto.create(errMessage);
        const errResponse = BaseResponse.create(requestId, info, errDto);

        response.status(errResponse.responseInfo.status).json(errResponse);
    }
}

/**
 * get Exception informations
 *
 * @param exception - Internal Micro Service Exception
 * @returns response information, error message
 */
function getExceptionInfo(exception: InternalServiceException): [ResponseInfo, string] {
    let message = 'exception is not defined';
    let info = INTERNAL_SERVER_ERROR;

    // check if it's not a null, undefined value
    if (exception === null || exception === undefined) {
        return [info, message];
    }

    const exceptionName = getExceptionName(exception);

    switch (exceptionName) {
        case INTERNAL_SERVICE_EXCEPTION.API_MESSAGE:
            [info, message] = getMessageExceptionInfo(exception);
            break;
        case INTERNAL_SERVICE_EXCEPTION.UNDEFINED:
            info = INTERNAL_SERVICE_ERROR;
            message = 'internal service error';
            break;
    }

    return [info, message];
}

/**
 * get Internal Service Exception name
 *
 * @param exception - Internal Micro Service Exception
 * @returns Exception Name
 */
function getExceptionName(exception: InternalServiceException): string {
    if (exception instanceof ApiMessageException) {
        return INTERNAL_SERVICE_EXCEPTION.API_MESSAGE;
    } else {
        return INTERNAL_SERVICE_EXCEPTION.UNDEFINED;
    }
}

/**
 * get Message Service Exception Information & message to response
 *
 * @param exception - Internal Micro Service Exception(ApiMessageException)
 * @returns response information, error message
 */
function getMessageExceptionInfo(exception: InternalServiceException): [ResponseInfo, string] {
    const messageException = exception as ApiMessageException;
    let info = MESSAGE_SERVICE_ERROR;
    let errMessage = 'message service error';

    switch (messageException.status) {
        default:
            info = MESSAGE_SERVICE_ERROR;
            break;
    }

    return [info, errMessage];
}
