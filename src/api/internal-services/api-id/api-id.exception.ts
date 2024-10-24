import { INTERNAL_SERVICE_EXCEPTION } from '../constants/exception-name.constants';
import { InternalServiceException } from '../exceptions';

export class ApiIdException extends InternalServiceException {
    public readonly name: string;

    constructor(status: number, requestId: string, message: string) {
        super(status, requestId, message);
        this.name = INTERNAL_SERVICE_EXCEPTION.API_ID;
    }
}

/**
 * check if it's ApiIdException
 *
 * @param exception - Internal Micro Service Exception
 * @returns return true if exception is instance of ApiIdException
 */
export function isApiIdException(exception: InternalServiceException): boolean {
    if (exception instanceof ApiIdException) {
        return true;
    } else {
        return false;
    }
}
