import { IsNumber, IsString } from 'class-validator';

export class DefaultDto {
    @IsString()
    responseStr: string;

    static create(datetime: string): DefaultDto {
        const dto = new DefaultDto();
        dto.responseStr = datetime;
        return dto;
    }
}

export class HealthCheckDto {
    @IsString()
    datetime: string;

    static create(datetime: string): HealthCheckDto {
        const dto = new HealthCheckDto();
        dto.datetime = datetime;
        return dto;
    }
}

export class CheckDto {
    @IsNumber()
    param: number;

    static create(param: any): CheckDto {
        const dto = new CheckDto();
        dto.param = param;
        return dto;
    }
}
export class CheckUsePipeDto {
    @IsNumber()
    param: number;

    static create(param: any): CheckUsePipeDto {
        const dto = new CheckDto();
        dto.param = param;
        return dto;
    }
}
