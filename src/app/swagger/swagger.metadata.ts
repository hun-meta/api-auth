// swagger.metadata.ts
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from 'src/common/exception/types';
import { createBody, createSwaggerOptions } from '../../common/swagger/swagger.decorator';
import { SUCCESS_RES } from '../types';

export const getDefaultResponseOpts = createSwaggerOptions({
    summary: 'return datetime, for testing server(Default Path)',
    responses: [
        { status: 200, description: "request success", schema: { example: createBody(SUCCESS_RES, { responseStr: "Welcome to API - Auth\n<DateTime>" }) } },
    ]
});

export const getHealthOpts = createSwaggerOptions({
    summary: 'AWS Health Check Path',
    responses: [
        { status: 200, description: "request success", schema: { example: createBody(SUCCESS_RES, { responseStr: "<DateTime>" }) } },
    ]
});

export const checkUsePipeOpts = createSwaggerOptions({
  summary: 'for testing nestJS Decorator',
  queries: [
    { name: 'param1', required: true, type: Number, description: 'The first parameter, must be a number' },
    { name: 'param2', required: false, type: String, description: 'The second parameter, optional string' }
],
  responses: [  
    { status: 200, description: "request success, return param1", schema: { example: createBody(SUCCESS_RES, { param: 0 }) } },
    { status: 400, description: 'Bad Request', schema: { example: createBody(BAD_REQUEST, { message: "param1 must be a number conforming to the specified constraints, param1 should not be empty" }) } },
    { status: 500, description: 'Internal Server Error', schema: { example: createBody(INTERNAL_SERVER_ERROR, { message: "Internal server error" }) } }
  ]
});
