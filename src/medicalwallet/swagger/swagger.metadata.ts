// swagger.metadata.ts
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from 'src/common/exception/types';
import { createBody, createSwaggerOptions } from '../../common/swagger/swagger.decorator';
import { CHECKED } from '../types';

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
            status: 200,
            description: 'request success, account not available',
            schema: { example: createBody(CHECKED, { available: false }) },
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
    ],
});
