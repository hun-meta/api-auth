// 20000~ Internal Service Error code
// 21000~ API-Message Service Error code

import { ResponseInfo } from "src/common/response/types";

// Unspecified Internal Service Error
export const INTERNAL_SERVICE_ERROR: ResponseInfo = {
    status: 500,
    returnCode: 20001,
    message: 'INTERNAL_SERVICE_ERROR',
};

// API-Message Service Error
export const MESSAGE_SERVICE_ERROR: ResponseInfo = {
    status: 500,
    returnCode: 21101,
    message: 'API-Message Service Error',
};