import { IsString } from 'class-validator';

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