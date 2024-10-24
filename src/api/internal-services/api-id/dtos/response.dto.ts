import { IsNotEmpty, IsString } from 'class-validator';

// api-id generateTableID Response data DTO
export class GenTableIdResDto {
    @IsNotEmpty()
    @IsString()
    table: string;

    @IsNotEmpty()
    @IsString()
    id: string;
}
