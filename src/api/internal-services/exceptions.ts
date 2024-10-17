// Base Exception for Internal Service
export class InternalServiceException extends Error {

    public readonly status: number;
    public readonly requestId: string;

    constructor(status: number, requestId: string, message: string) {
        super(message);
        this.status = status;
        this.requestId = requestId;
    }
}