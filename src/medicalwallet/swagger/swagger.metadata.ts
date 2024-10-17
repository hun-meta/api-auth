// swagger.metadata.ts
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from 'src/common/exception/types/http.type';
import { createBody, createSwaggerOptions } from '../../common/swagger/swagger.decorator';
import { CHECKED, SENT_CODE } from '../constants/response-info.constants';
import { DB_CONNECTION_ERROR } from 'src/orm/database.type';

export const checkAccountOpts = createSwaggerOptions({
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
            schema: { example: createBody(CHECKED, { available: true, account_token: '<jwt token value>' }) },
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

export const sendCodeOpts = createSwaggerOptions({
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
                    example: '01034557205',
                },
            },
            required: ['mobile'],
        },
    },
    responses: [
        {
            status: 202,
            description: 'request success, verifivation code sent',
            schema: { example: createBody(SENT_CODE, { mobile_token: '<jwt token value>' }) },
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
