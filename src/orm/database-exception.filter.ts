// all-exceptions.filter.ts
import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { GlobalErrorDto } from '../common/exception/dto';
import { ClsService } from 'nestjs-cls';
import { LoggerService } from '../common/logger/logger.service';
import { BaseResponse } from '../common/response/dto/base-response.dto';
import { ResponseInfo } from '../common/response/types';
import { DatabaseException } from './DatabaseException';
import { DB_CONNECTION_FAILED, DB_QUERY_FAILED, DB_UNDEFINED } from 'src/orm/consts';
import {
    DB_CONNECTION_ERROR,
    DB_DUPLICATE_ERROR,
    DB_FIELD_ERROR,
    DB_LOCK_TIMEOUT_ERROR,
    DB_LONGDATA_ERROR,
    DB_UNDEFINED_ERROR,
    DB_UNDELETABLE_ERROR,
    DB_WRONG_QUERY_ERROR,
} from './database.type';

// INFO: 전역 DB 예외 필터
@Catch(DatabaseException)
export class DatabaseExceptionFilter implements ExceptionFilter {
    constructor(
        private readonly cls: ClsService,
        private readonly logger: LoggerService,
    ) {
        this.logger.setContext(DatabaseExceptionFilter.name);
    }

    catch(exception: DatabaseException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const requestId = this.cls.get('requestId') ?? 'Request ID undefined';

        let errName = 'DatabaseError';
        let info = null;
        let errMessage = '';

        // database exception handling
        if (exception.name === DB_QUERY_FAILED) {
            [info, errMessage] = getQueryErrorInfo(exception);
            if (info === DB_UNDEFINED_ERROR) {
                this.logger.error(`Request Error - ID: ${requestId}, Undefined DB QueryError Occured`);
            }
        } else if (exception.name === DB_CONNECTION_FAILED) {
            info = DB_CONNECTION_ERROR;
            errMessage = 'Server unavailable';
        } else if (exception.name === DB_UNDEFINED) {
            info = DB_UNDEFINED_ERROR;
            this.logger.error(`Request Error - ID: ${requestId}, Undefined DB Error Occured`);
        }

        this.logger.error(
            `Request Error - ID: ${requestId}, ${errName}: ${errMessage}`,
            exception.stack || exception.driveError.message || '',
        );

        const errDto = GlobalErrorDto.create(errMessage);
        const errResponse = BaseResponse.create(requestId, info, errDto);

        response.status(errResponse.responseInfo.status).json(errResponse);
    }
}

// Assume as MariaDB Exception
function getQueryErrorInfo(exception: DatabaseException): [ResponseInfo, string] {
    const errCode: string = exception.driveError.code || 'CodeUndefined';
    let message = 'Internal server error';
    let info: ResponseInfo = null;

    switch (errCode) {
        case '1062': // ER_DUP_ENTRY
            message = 'already exist';
            info = DB_DUPLICATE_ERROR;
            break;
        case '1451':
            info = DB_UNDELETABLE_ERROR;
            break;
        case '1054':
            message = 'wrong input expected';
            info = DB_FIELD_ERROR;
            break;
        case '1064':
            info = DB_WRONG_QUERY_ERROR;
            break;
        case '1205':
            info = DB_LOCK_TIMEOUT_ERROR;
            break;
        case '1406':
            message = 'wrong input expected';
            info = DB_LONGDATA_ERROR;
            break;
        default:
            info = DB_UNDEFINED_ERROR;
    }

    return [info, message];
}
