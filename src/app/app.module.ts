import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ClsModule, ClsMiddleware } from 'nestjs-cls';
import { RequestIdMiddleware } from '../common/request/request-id.middleware';
import { AppController } from './services/app.controller';
import { AppService } from './services/app.service';
import { TestModule } from 'src/test/test.module';
import { ResponseInterceptor } from 'src/common/response/interceptor/response.interceptor';
import { GlobalExceptionsFilter } from 'src/common/exception/global-exception.filter';
import { winstonLogger } from 'src/common/logger/logger.config';

@Module({
  imports: [
    ClsModule.forRoot({
      global: true,
      middleware: { mount: true },
    }),
    TestModule, // 모듈 import 예시
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
    AppService,
  ],
  // exports: [ClsService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ClsMiddleware, RequestIdMiddleware) // ClsMiddleware가 먼저 동작하도록 설정
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
