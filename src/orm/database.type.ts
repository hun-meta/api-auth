import { ResponseInfo } from 'src/common/response/types';

export const DB_UNDEFINED_ERROR: ResponseInfo = {
    status: 500,
    returnCode: 6000,
    message: 'DB_UNDEFINED_ERROR',
};

export const DB_CONNECTION_ERROR: ResponseInfo = {
    status: 503,
    returnCode: 6001,
    message: 'DB_CONNECTION_ERROR',
};

export const DB_DUPLICATE_ERROR: ResponseInfo = {
    status: 500,
    returnCode: 6002,
    message: 'ER_DUP_ENTRY',
};

export const DB_UNDELETABLE_ERROR: ResponseInfo = {
    status: 500,
    returnCode: 6003,
    message: 'ER_NO_REFERENCED_ROW_2',
};

export const DB_FIELD_ERROR: ResponseInfo = {
    status: 500,
    returnCode: 6004,
    message: 'ER_BAD_FIELD_ERROR',
};

export const DB_WRONG_QUERY_ERROR: ResponseInfo = {
    status: 500,
    returnCode: 6005,
    message: 'ER_PARSE_ERROR',
};

export const DB_LOCK_TIMEOUT_ERROR: ResponseInfo = {
    status: 500,
    returnCode: 6006,
    message: 'ER_LOCK_WAIT_TIMEOUT',
};

export const DB_LONGDATA_ERROR: ResponseInfo = {
    status: 500,
    returnCode: 6007,
    message: 'ER_DATA_TOO_LONG',
};
