// swagger.metadata.ts
import {
    BAD_REQUEST,
    INTERNAL_SERVER_ERROR,
    UNAUTHORIZED,
} from 'src/common/exception/constants/http.response-info.constants';
import { createBody, createSwaggerOptions } from '../../common/decorator/swagger.decorator';
import { CHECKED, REGISTERED, SENT_CODE, VERIFIED } from '../constants/response-info.constants';
import { DB_CONNECTION_ERROR } from 'src/orm/database.type';

export const CHECK_ACCOUNT_OPTS = createSwaggerOptions({
    summary: 'check account value is available for registering',
    body: {
        description: 'user login account value',
        required: true,
        schema: {
            type: 'object',
            properties: {
                account: {
                    type: 'boolean',
                    description: 'The login account for user',
                    example: 'testaccount',
                },
            },
            required: ['account'],
        },
    },
    responses: [
        {
            status: 200,
            description: 'request success, account available',
            schema: { example: createBody(CHECKED, { available: true, accountToken: '<jwt token value>' }) },
        },
        {
            status: 400,
            description: 'Bad Request',
            schema: {
                example: createBody(BAD_REQUEST, {
                    message:
                        'Login Account must be 6 to 20 characters long and contain only Alphabet letters and numbers.',
                }),
            },
        },
        {
            status: 500,
            description: 'Internal Server Error',
            schema: {
                example: createBody(INTERNAL_SERVER_ERROR, {
                    message: 'Internal server error',
                }),
            },
        },
        {
            status: 503,
            description: 'Server Connection Error',
            schema: {
                example: createBody(DB_CONNECTION_ERROR, {
                    message: 'Server unavailable',
                }),
            },
        },
    ],
});

export const SEND_CODE_OPTS = createSwaggerOptions({
    summary: 'send mobile verification code for verifying number for registering',
    body: {
        description: 'user mobile value',
        required: true,
        schema: {
            type: 'object',
            properties: {
                mobile: {
                    type: 'string',
                    description: 'The mobile number value',
                    example: '01012345678',
                },
            },
            required: ['mobile'],
        },
    },
    responses: [
        {
            status: 202,
            description: 'request success, verifivation code sent',
            schema: { example: createBody(SENT_CODE, { mobileVerificationToken: '<jwt token value>' }) },
        },
        {
            status: 400,
            description: 'Bad Request',
            schema: {
                example: createBody(BAD_REQUEST, {
                    message: 'Mobile phone number must be 10 or 11 digits long and start with "01".',
                }),
            },
        },
        {
            status: 500,
            description: 'Internal Server Error',
            schema: {
                example: createBody(INTERNAL_SERVER_ERROR, {
                    message: 'Internal server error',
                }),
            },
        },
    ],
});

export const VERIFY_CODE_OPTS = createSwaggerOptions({
    summary: 'Verify the code for mobile phone number authentication and issue a mobile token for user registration',
    headers: [
        {
            name: 'MOBILE-VERIFICATION-TOKEN',
            description: 'mobile verification token to verify mobile number',
            required: true,
            schema: {
                type: 'string',
                example: 'Bearer value',
            },
        },
    ],
    body: {
        description: 'mobile number to verify & verification code',
        required: true,
        schema: {
            type: 'object',
            properties: {
                mobile: {
                    type: 'string',
                    description: 'The mobile number value',
                    example: '01012345678',
                },
                verificationCode: {
                    type: 'number',
                    description: 'The verification code from phone',
                    example: 123456,
                },
            },
            required: ['mobile', 'verificationCode'],
        },
    },
    responses: [
        {
            status: 200,
            description: 'request success, mobile number verified',
            schema: { example: createBody(VERIFIED, { mobileToken: '<jwt token value>' }) },
        },
        {
            status: 400,
            description: 'Bad Request',
            schema: {
                example: createBody(BAD_REQUEST, {
                    message: 'Mobile phone number must be 10 or 11 digits long and start with "01".',
                }),
            },
        },
        {
            status: 401,
            description: 'Unauthorized',
            schema: {
                example: createBody(UNAUTHORIZED, {
                    message: 'Invalid token',
                }),
            },
        },
        {
            status: 500,
            description: 'Internal Server Error',
            schema: {
                example: createBody(INTERNAL_SERVER_ERROR, {
                    message: 'Internal server error',
                }),
            },
        },
    ],
});

// REGISTER_OPTS
export const REGISTER_OPTS = createSwaggerOptions({
    summary: 'register medical wallet user & some validation',
    headers: [
        {
            name: 'ACCOUNT-TOKEN',
            description: 'account token to prove which is available',
            required: true,
            schema: {
                type: 'string',
                example: 'Bearer value',
            },
        },
        {
            name: 'MOBILE-TOKEN',
            description: 'mobile token to prove which is verified',
            required: true,
            schema: {
                type: 'string',
                example: 'Bearer value',
            },
        },
    ],
    body: {
        description: 'all information to register medical wallet user',
        required: true,
        schema: {
            type: 'object',
            properties: {
                account: {
                    type: 'string',
                    description: 'login account, 6 to 20 characters long and contain only Alphabet letters and numbers',
                    example: 'testaccount',
                },
                password: {
                    type: 'string',
                    description: 'login password, at least 8 characters long and include at least one Alphabet letter, one number, and one special character',
                    example: 'password123',
                },
                mobile: {
                    type: 'string',
                    description: 'The mobile number, 10 or 11 digits long and start with "01"',
                    example: '01012345678',
                },
                name: {
                    type: 'string',
                    description: 'nickname, between 2 and 10 characters long',
                    example: 'mynick',
                },
                birth: {
                    type: 'string',
                    description: 'date of birth, YYYY-MM-DD',
                    example: '1970-01-01',
                },
                sex_code: {
                    type: 'string',
                    description: 'first value of Last digit of resident registration number',
                    example: '1',
                },
            },
            required: ['account', 'password', 'mobile', 'name', 'birth', 'sex_code'],
        },
    },
    responses: [
        {
            status: 201,
            description: 'Register Success',
            schema: { example: createBody(REGISTERED, { userId: '<user id value>', inserted_at: '<timestamp>' }) },
        },
        {
            status: 400,
            description: 'Bad Request',
            schema: {
                example: createBody(BAD_REQUEST, {
                    message: 'Login Account must be 6 to 20 characters long and contain only Alphabet letters and numbers. || Password must be at least 8 characters long and include at least one Alphabet letter, one number, and one special character. || Mobile phone number must be 10 or 11 digits long and start with "01". || Name must be between 2 and 10 characters long and can include Alphabet or Hangul characters. || Birth must be a valid date in the format YYYY-MM-DD. || Sex code must be one of the following values: 1, 2, 3, 4.',
                }),
            },
        },
        {
            status: 401,
            description: 'Unauthorized',
            schema: {
                example: createBody(UNAUTHORIZED, {
                    message: 'Token header is missing || Token is Empty || Invalid token format || Invalid token',
                }),
            },
        },
        {
            status: 500,
            description: 'Internal Server Error',
            schema: {
                example: createBody(INTERNAL_SERVER_ERROR, {
                    message: 'Internal server error || API-Message Service Error',
                }),
            },
        },
        {
            status: 503,
            description: 'DB currently unavailable',
            schema: {
                example: createBody(DB_CONNECTION_ERROR, {
                    message: 'Server unavailable',
                }),
            },
        },
    ],
});