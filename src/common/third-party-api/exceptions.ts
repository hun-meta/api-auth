import { ResponseInfo } from 'src/common/response/types';

// Base Exception for own MSA Service
export class ApiServiceException extends Error {

    public readonly status: number;
    public readonly requestId: string;

    constructor(status: number, requestId: string, message: string) {
        super(message);
        this.status = status;
        this.requestId = requestId;
    }
}