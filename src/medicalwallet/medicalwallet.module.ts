import { Module } from '@nestjs/common';
import { MedicalwalletService } from './services/medicalwallet.service';
import { MedicalwalletController } from './services/medicalwallet.controller';

@Module({
  controllers: [MedicalwalletController],
  providers: [MedicalwalletService],
})
export class MedicalwalletModule {}
