import { ResponseInfo } from 'src/common/response/types';
// jwt 8000~8999
// 로그인 계정 중복 확인 (회원 가입 전)
export const JWT_VERIFIED: ResponseInfo = {
    status: 200,
    returnCode: 0,
    message: 'Valid jwt token',
};

// Expired Token
export const JWT_EXPIRED: ResponseInfo = {
    status: 401,
    returnCode: 8001,
    message: 'Access token expired, please login again',
};

// Invalid Token
export const JWT_INVALID: ResponseInfo = {
    status: 401,
    returnCode: 8002,
    message: 'Invalid jwt token',
};
