import { ResponseInfo } from 'src/common/response/types';
import { ApiServiceException } from '../exceptions';

export class ApiMessageException extends ApiServiceException {

    public readonly name: string;

    constructor(status: number, requestId: string, message: string) {
        super(status, requestId, message);
        this.name = 'ApiMessageException';
    }
}