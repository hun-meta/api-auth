import { IsString, Matches, IsDateString, IsIn } from 'class-validator';

// 로그인 계정 중복 확인 DTO
export class CheckAccountDto {
    @IsString()
    @Matches(/^[A-Za-z0-9]{6,20}$/, {
        message: 'Login Account must be 6 to 20 characters long and contain only Alphabet letters and numbers.',
    })
    account: string; // 6~20자(영어 숫자만 허용)
}

// 회원가입 요청 DTO
export class RegisterDTO {
    @IsString()
    @Matches(/^[A-Za-z0-9]{6,20}$/, {
        message: 'Login Account must be 6 to 20 characters long and contain only Alphabet letters and numbers.',
    })
    account: string; // 6~20자(영어 숫자만 허용)

    /* 비밀번호 허용 특수문자
        !, @, #, $, %, ^, &, *, (, ), _, +, -, =
        [, ], {, }, ;, ', :, ", \, |, ,, ., <, >, /, ?
    */
    @IsString()
    @Matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/,
        {
            message:
                'Password must be at least 8 characters long and include at least one Alphabet letter, one number, and one special character.',
        },
    )
    password: string; // 8자 이상 (특수문자 영어 숫자 조합 허용)

    @IsString()
    @Matches(/^01\d{8,9}$/, {
        message: 'Mobile phone number must be 10 or 11 digits long and start with "01".',
    })
    mobile: string; // 10~11자, 01로 시작

    @IsString()
    @Matches(/^[A-Za-z가-힣]{2,10}$/, {
        message: 'Name must be between 2 and 10 characters long and can include Alphabet or Hangul characters.',
    })
    name: string; // 2~10자, 한글&영어

    @IsDateString({}, { message: 'Birth must be a valid date in the format YYYY-MM-DD.' })
    birth: string; // 생년월일 8자, 날짜

    @IsString()
    @IsIn(['1', '2', '3', '4'], {
        message: 'Sex code must be one of the following values: 1, 2, 3, 4.',
    })
    sex_code: string; // 1, 2, 3, 4 / 1자리
}
