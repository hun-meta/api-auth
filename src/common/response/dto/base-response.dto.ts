import { IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

// 공통 응답 형식을 정의하는 DTO
export class BaseResponseDto<T> {
  @IsString()
  requestId: string;

  @IsNumber() // 정상 0, 비정상 그외 숫자
  returnCode: number;

  @ValidateNested()
  @Type(() => Object)
  data: T;
}
