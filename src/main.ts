import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { INestApplication, ClassSerializerInterceptor } from '@nestjs/common';

// Root Execution Function
async function bootstrap() {
  // 서버 실행 시간 로깅
  console.log("Starting API-Auth NestJS Application..");
  const currentDate = new Date();
  console.log(`Execution Date and Time: ${currentDate.toLocaleString()}`);
  const unixTime = Math.floor(currentDate.getTime() / 1000);
  console.log(`Unix Time: ${unixTime}`);
  console.log("");

  const ABORT_ON_ERROR = process.env.ABORT_ON_ERROR === 'true';
  const app = await NestFactory.create(AppModule, { abortOnError: ABORT_ON_ERROR });

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
