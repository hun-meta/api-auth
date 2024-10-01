import { IsBoolean, IsString } from 'class-validator';

export class CheckAccountResDto {
    @IsBoolean()
    available: boolean; // return true if Account value is available

    static create(available: boolean): CheckAccountResDto {
        const dto = new CheckAccountResDto();
        dto.available = available;

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
