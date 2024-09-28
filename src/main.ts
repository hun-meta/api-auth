// NestJS
import { NestFactory, Reflector } from '@nestjs/core';
import { INestApplication, ClassSerializerInterceptor } from '@nestjs/common';
// 3rd Party
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
dotenv.config();
// Local
import { AppModule } from './app/app.module';

// Root Execution Function
async function bootstrap() {
  // Loggin Start Time
  const currentDate = new Date();
  const unixTime = Math.floor(currentDate.getTime() / 1000);
  console.log(`\nStarting API-Auth NestJS Application..\nExecution Date and Time: ${currentDate.toLocaleString()}\nUnix Time: ${unixTime}\n`);

  const ABORT_ON_ERROR = process.env.ABORT_ON_ERROR === 'true';
  const app = await NestFactory.create(AppModule, { abortOnError: ABORT_ON_ERROR, logger: false });

  // Set Global Prefix for API-AUTH
  app.setGlobalPrefix('api/auth');

  // Set Swagger docs
  const config = new DocumentBuilder()
    .setTitle('API 문서')
    .setDescription('API 설명서입니다.')
    .setVersion('1.0')
    .addTag('API')
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

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
