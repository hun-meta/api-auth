import { ResponseInfo } from 'src/common/response/types';

// 로그인 계정 중복 확인 (회원 가입 전)
export const CHECKED: ResponseInfo = {
    status: 200,
    returnCode: 0,
    message: 'Check account Success',
};

// 회원 가입 성공
export const REGISTERED: ResponseInfo = {
    status: 201,
    returnCode: 0,
    message: 'Register Success',
};
