import { HttpException, Injectable } from '@nestjs/common';
import { DatabaseException } from '../../orm/DatabaseException';
import { CustomUndefinedError, CustomUnExpectedError } from './errors';

@Injectable()
export class ErrorHandler {
    handleError(error: any): Error {
        if (error instanceof DatabaseException || error instanceof HttpException) {
            return error;
        }else if(error instanceof Error){
            return this.getUnExpectedError(error);
        }else{
            return this.getUnDefinedError(error);
        }
    }

    private getUnExpectedError(error: Error): CustomUnExpectedError {
        const unExError = new CustomUnExpectedError(error);

        return unExError;
    }

    private getUnDefinedError(error: any): CustomUndefinedError {
        const unDefError = new CustomUndefinedError(error);

        return unDefError;
    }
}
