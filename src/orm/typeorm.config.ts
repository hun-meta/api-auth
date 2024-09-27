import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export function TypeormConfig(configService: ConfigService){
    const env = configService.get('NODE_ENV');
    if(!['development, staging, production'].includes(env)){
        throw Error('NODE_ENV Undefined Error');
    }

    const syncronize = configService.get<string>('DB_SYNC') === 'true' ? true : false;
    const logging = configService.get<string>('DB_LOGGING') === 'true' ? true : false;
    
    const option: TypeOrmModuleOptions = {
        type: configService.get<string>('DB_TYPE') as any,
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        autoLoadEntities: true,
        synchronize: syncronize,
        useUTC: false, // Local Timezon이 아닌 UTC 기준으로 사용할지 여부를 결정
        logging: logging,
        retryAttempts: env === 'production' ? 10 : 1,
    }
    
    return option;
}