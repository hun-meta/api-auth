import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { ClsModule, ClsMiddleware } from 'nestjs-cls';
import { RequestIdMiddleware } from '../common/request/request-id.middleware';
import { AppController } from './services/app.controller.v1';
import { AppService } from './services/app.service';
import { ResponseInterceptor } from 'src/common/response/interceptor/response.interceptor';
import { GlobalExceptionsFilter } from 'src/common/exception/global-exception.filter';
import { winstonLogger } from 'src/common/logger/logger.config';
import { LoggerService } from 'src/common/logger/logger.service';
import { MedicalwalletModule } from 'src/medicalwallet/medicalwallet.module';

@Module({
  imports: [
    ClsModule.forRoot({
      global: true,
      middleware: { mount: true },
    }),
    ConfigModule.forRoot({ envFilePath: `.env.${process.env.NODE_ENV}` }),
    MedicalwalletModule,
    winstonLogger // 로거 임포트
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionsFilter,
    },
    { // 응답 변환 인터셉터
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    LoggerService,
    AppService,
  ],
  exports: [LoggerService], // 하위 모듈에도 제공(싱글 톤 유지)
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ClsMiddleware, RequestIdMiddleware) // ClsMiddleware가 먼저 동작하도록 설정
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
