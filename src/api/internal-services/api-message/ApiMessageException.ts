import { INTERNAL_SERVICE_EXCEPTION } from '../constants/exception-name.constants';
import { InternalServiceException } from '../exceptions';

export class ApiMessageException extends InternalServiceException {

    public readonly name: string;

    constructor(status: number, requestId: string, message: string) {
        super(status, requestId, message);
        this.name = INTERNAL_SERVICE_EXCEPTION.API_MESSAGE;
    }
}

/**
 * check if it's ApiMessageException
 *
 * @param exception - Internal Micro Service Exception
 * @returns return true if exception is instance of ApiMessageException
 */
export function isApiMessageException(exception: InternalServiceException): boolean{
    if(exception instanceof ApiMessageException){
        return true;
    }else{
        return false;
    }
}