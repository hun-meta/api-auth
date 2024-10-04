import { IsString } from "class-validator";

export class SendSmsResDto {
    
    @IsString()
    message: string;

    static create(message: string): SendSmsResDto {
        const dto = new SendSmsResDto();
        dto.message = message;

        return dto;
    }
}

export class ErrorResDto {

    @IsString()
    message: string;

    static create(message: string): ErrorResDto {
        const dto = new ErrorResDto();
        dto.message = message;

        return dto;
    }
}