import { Module } from '@nestjs/common';
import { ErrorHandlerService } from './error-handler.service';

@Module({
  providers: [ErrorHandlerService],
  exports: [ErrorHandlerService],  // 다른 모듈에서 사용할 수 있도록 export
})
export class ErrorHandlerModule {}
