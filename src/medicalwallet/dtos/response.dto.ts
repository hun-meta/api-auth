import { IsBoolean, IsString } from 'class-validator';

export class CheckAccountResDTO {
    @IsBoolean()
    available: boolean; // return true if Account value is available

    @IsString()
    accountToken: string; // return token value if Account value is available

    static create(available: boolean, accountToken: string): CheckAccountResDTO {
        const dto = new CheckAccountResDTO();
        dto.available = available;
        dto.accountToken = accountToken;

        return dto;
    }
}

export class SendCodeResDTO {
    @IsString()
    mobileVerificationToken: string; // <jwt token for verify mobile>

    static create(mobileVerificationToken: string): SendCodeResDTO {
        const dto = new SendCodeResDTO();
        dto.mobileVerificationToken = mobileVerificationToken;

        return dto;
    }
}

export class VerifyCodeResDTO {
    @IsString()
    mobileToken: string; // return token value if mobile number verification is complete

    static create(mobileToken: string): VerifyCodeResDTO {
        const dto = new VerifyCodeResDTO();
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
