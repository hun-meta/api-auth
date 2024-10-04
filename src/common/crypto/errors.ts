// jwt Token Error
export class JwtTokenError extends Error {
    code: number;

    constructor(envNames: string[]) {
        super(`Env Undefined Error: ${envNames.join(', ')}`);
        this.name = 'EnvUndefinedError';
        this.code = 9002;

        // Set Prototype for "instanceof CustomUndefinedError"
        Object.setPrototypeOf(this, new.target.prototype);
    }
}