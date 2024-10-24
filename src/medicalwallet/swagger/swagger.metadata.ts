// swagger.metadata.ts
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, UNAUTHORIZED } from 'src/common/exception/constants/http.response-info.constants';
import { createBody, createSwaggerOptions } from '../../common/decorator/swagger.decorator';
import { CHECKED, SENT_CODE, VERIFIED } from '../constants/response-info.constants';
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
                    message:
                        'Mobile phone number must be 10 or 11 digits long and start with "01".',
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
        }
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
                    message:
                        'Mobile phone number must be 10 or 11 digits long and start with "01".',
                }),
            },
        },
        {
            status: 401,
            description: 'Unauthorized',
            schema: {
                example: createBody(UNAUTHORIZED, {
                    message:
                        'Invalid token',
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
        }
    ],
});
