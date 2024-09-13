import { IsString } from 'class-validator';

// Default Response DTO for root-path & health check
export class DefaultDto {

  @IsString()
  datetime: string;

}
