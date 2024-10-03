// swagger.metadata.ts
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from 'src/common/exception/types/http.type';
import { createBody, createSwaggerOptions } from '../../common/swagger/swagger.decorator';
import { CHECKED } from '../types';
import { DB_CONNECTION_ERROR } from 'src/common/exception/types/database.type';

export const checkAccountOpts = createSwaggerOptions({
    summary: 'check account value is available for registering',
    body: {
        description: 'user login account value',
        required: true,
        schema: {
            type: 'object',
            properties: {
                account: {
                    type: 'string',
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
            schema: { example: createBody(CHECKED, { available: true }) },
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
