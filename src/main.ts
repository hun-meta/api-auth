import * as dotenv from 'dotenv';
dotenv.config();
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { INestApplication, ClassSerializerInterceptor } from '@nestjs/common';

// Root Execution Function
async function bootstrap() {
  // 서버 실행 시간 로깅
  const currentDate = new Date();
  const unixTime = Math.floor(currentDate.getTime() / 1000);

  const ABORT_ON_ERROR = process.env.ABORT_ON_ERROR === 'true';
  const app = await NestFactory.create(AppModule, { abortOnError: ABORT_ON_ERROR, logger: false });

  console.log(`\nStarting API-Auth NestJS Application..\nExecution Date and Time: ${currentDate.toLocaleString()}\nUnix Time: ${unixTime}\n`);

  // 응답객체 변환 전역 인터셉터 설정
  await app.listen(3000);
}

// NOTE: @Exclude를 추가해야하는 속성이 @Expose를 설정해야하는 속성보다 적어서 현재 사용 X
// 전역 직렬화 옵션 설정 INFO: 모든 속성을 직렬화에서 제외, 필요하면 명시적 @Expose 필요
export function registerGlobals(app: INestApplication) {
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector), {
      strategy: 'excludeAll', // 모든 속성을 역직렬화에서 제외
      excludeExtraneousValues: true, // 클래스에 정의되지 않은 속성은 변환 시에 제거한다.
    }),
  );
}

bootstrap();
