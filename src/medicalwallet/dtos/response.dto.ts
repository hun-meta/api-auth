import { IsBoolean, IsString } from 'class-validator';

export class CheckAccountResDto {
    @IsBoolean()
    available: boolean; // return true if Account value is available

    @IsString()
    accountToken: string; // return token value if Account value is available

    static create(available: boolean, accountToken: string): CheckAccountResDto {
        const dto = new CheckAccountResDto();
        dto.available = available;
        dto.accountToken = accountToken;

        return dto;
    }
}

export class SendCodeResDto {
    @IsString()
    mobileVerificationToken: string; // <jwt token for verify mobile>

    static create(mobileVerificationToken: string): SendCodeResDto {
        const dto = new SendCodeResDto();
        dto.mobileVerificationToken = mobileVerificationToken;

        return dto;
    }
}

export class VerifyCodeResDto {
    @IsString()
    mobileToken: string; // return token value if mobile number verification is complete

    static create(mobileToken: string): VerifyCodeResDto {
        const dto = new VerifyCodeResDto();
        dto.mobileToken = mobileToken;

        return dto;
    }
}

export class RegisterResDTO {
    @IsString()
    user_id: string;

    @IsString()
    dateTime: string;

    static create(user_id: string, dateTime: string): RegisterResDTO {
        const dto = new RegisterResDTO();
        dto.user_id = user_id;
        dto.dateTime = dateTime;

        return dto;
    }
}
