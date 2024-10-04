import { IsBoolean, IsString } from 'class-validator';

export class CheckAccountResDto {
    @IsBoolean()
    available: boolean; // return true if Account value is available

    @IsString()
    account_token: string; // return token value if Account value is available

    static create(available: boolean, account_token: string): CheckAccountResDto {
        const dto = new CheckAccountResDto();
        dto.available = available;
        dto.account_token = account_token;

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
