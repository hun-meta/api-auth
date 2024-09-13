import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

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
bootstrap();
