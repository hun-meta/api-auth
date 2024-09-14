import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ClsModule, ClsMiddleware } from 'nestjs-cls';
import { RequestIdMiddleware } from '../common/request/request-id.middleware';
import { AppController } from './services/app.controller';
import { AppService } from './services/app.service';
import { TestModule } from 'src/test/test.module';

@Module({
  imports: [
    ClsModule.forRoot({
      global: true,
      middleware: { mount: true },
    }),
    TestModule
  ],
  controllers: [AppController],
  providers: [AppService],
  // exports: [ClsService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ClsMiddleware, RequestIdMiddleware) // ClsMiddleware가 먼저 동작하도록 설정
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
