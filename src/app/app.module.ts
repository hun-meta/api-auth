// NestJS
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
// 3rd-party
import { ClsModule, ClsMiddleware } from 'nestjs-cls';
import { TypeOrmModule } from '@nestjs/typeorm';
// Custom Modules
import { RequestIdMiddleware } from '../common/request/request-id.middleware';
import { AppController } from './services/app.controller.v1';
import { AppService } from './services/app.service';
import { ResponseInterceptor } from 'src/common/response/interceptor/response.interceptor';
import { GlobalExceptionsFilter } from 'src/common/exception/global-exception.filter';
import { winstonLogger } from 'src/common/logger/logger.config';
import { LoggerService } from 'src/common/logger/logger.service';
import { MedicalwalletModule } from 'src/medicalwallet/medicalwallet.module';
import { TypeormConfig } from 'src/orm/typeorm.config';
import { ErrorHandlerModule } from 'src/common/exception/handler/error-handler.module';
import { DatabaseExceptionFilter } from 'src/common/exception/database-exception.filter';
import { CustomCryptoModule } from 'src/common/crypto/custom-crypto.module';

@Module({
    imports: [
        ClsModule.forRoot({
            global: true,
            middleware: { mount: true },
        }),
        ConfigModule.forRoot({
            envFilePath: ['.env', `.env.${process.env.NODE_ENV}`],
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: TypeormConfig,
        }),
        CustomCryptoModule,
        MedicalwalletModule,
        winstonLogger,
        ErrorHandlerModule
    ],
    controllers: [AppController],
    providers: [
        {
            provide: APP_FILTER,
            useClass: GlobalExceptionsFilter,
        },
        {
            provide: APP_FILTER,
            useClass: DatabaseExceptionFilter,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: ResponseInterceptor,
        },
        LoggerService,
        AppService
    ],
    exports: [LoggerService, ErrorHandlerModule],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(ClsMiddleware, RequestIdMiddleware) // ClsMiddleware가 먼저 동작하도록 설정
            .forRoutes({ path: '*', method: RequestMethod.ALL });
    }
}
