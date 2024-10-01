import { ResponseInfo } from 'src/common/response/types';

// server error
export const UNEXPECTED_ERROR: ResponseInfo = {
    status: 500,
    returnCode: 9000,
    message: 'UNEXPECTED_ERROR',
};

export const UNDEFINED_ERROR: ResponseInfo = {
    status: 500,
    returnCode: 9001,
    message: 'UNDEFINED_ERROR',
};
