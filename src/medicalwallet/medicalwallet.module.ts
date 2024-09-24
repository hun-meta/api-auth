import { Module } from '@nestjs/common';
import { MedicalwalletService } from './services/medicalwallet.service';
import { MedicalwalletController } from './services/medicalwallet.controller.v1';
import { LoggerService } from 'src/common/logger/logger.service';

@Module({
  controllers: [MedicalwalletController],
  providers: [
      MedicalwalletService,
      LoggerService
  ],
})
export class MedicalwalletModule {}
