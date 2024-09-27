export class CustomUndefinedError extends Error {
    code: number;

    constructor(error: any) {
        super(`Custom Undefined Error: ${error}`);
        this.name = 'CustomUndefinedError';
        this.code = 500;
        
        // Set Prototype for "instanceof CustomUndefinedError"
        Object.setPrototypeOf(this, new.target.prototype);
    }
}