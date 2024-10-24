import { IsString } from 'class-validator';

export class DefaultResDTO {
    @IsString()
    responseStr: string;

    static create(datetime: string): DefaultResDTO {
        const dto = new DefaultResDTO();
        dto.responseStr = datetime;
        return dto;
    }
}

export class HealthCheckResDTO {
    @IsString()
    datetime: string;

    static create(datetime: string): HealthCheckResDTO {
        const dto = new HealthCheckResDTO();
        dto.datetime = datetime;
        return dto;
    }
}
