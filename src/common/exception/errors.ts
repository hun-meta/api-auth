// Any Error instances that I didn't Expected. (Must handle it after Error occured)
export class CustomUnExpectedError extends Error {
    code: number;

    constructor(error: Error){
        super(error.message);
        this.name = 'CustomUnExpectedError';
        this.code = 9000;
        this.stack = error.stack || null;
    }
}

// Catched thing which is not Defined.
export class CustomUndefinedError extends Error {
    code: number;

    constructor(error: any) {
        super(`Custom Undefined Error: ${error}`);
        this.name = 'CustomUndefinedError';
        this.code = 9001;

        // Set Prototype for "instanceof CustomUndefinedError"
        Object.setPrototypeOf(this, new.target.prototype);
    }
}