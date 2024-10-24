import { IsNotEmpty, IsString } from 'class-validator';

// api-message SendSms Response data DTO
export class SendSmsResDto {
    @IsNotEmpty()
    @IsString()
    requestId: string;
}
