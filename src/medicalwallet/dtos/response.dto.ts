import { IsBoolean, IsString } from 'class-validator';
import { AutoCreate } from 'src/common/response/dto/base-response.dto';

@AutoCreate()
export class CheckAccountResDto {

  @IsBoolean()
  available: boolean; // return true if Account value is available
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