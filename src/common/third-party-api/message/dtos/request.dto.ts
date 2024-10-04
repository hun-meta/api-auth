import { IsString, Matches, IsDateString, IsIn } from 'class-validator';

// 로그인 계정 중복 확인 DTO
export class SendSmsDto {
    @IsString()
    mobile: string;

    @IsString()
    message: string;

    static create(mobile: string, message: string): SendSmsDto {
        const dto = new SendSmsDto();
        dto.mobile = mobile;
        dto.message = message;

        return dto;
    }
}