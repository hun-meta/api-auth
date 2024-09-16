import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ClsModule, ClsMiddleware } from 'nestjs-cls';
import { RequestIdMiddleware } from '../common/request/request-id.middleware';
import { AppController } from './services/app.controller';
import { AppService } from './services/app.service';
import { TestModule } from 'src/test/test.module';
import { ResponseInterceptor } from 'src/common/response/interceptor/response.interceptor';

@Module({
  imports: [
    ClsModule.forRoot({
      global: true,
      middleware: { mount: true },
    }),
    TestModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { // 응답 변환 인터셉터
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    }
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
