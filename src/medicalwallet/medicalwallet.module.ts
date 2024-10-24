import { Module } from '@nestjs/common';
import { MedicalwalletService } from './services/medicalwallet.service';
import { MedicalwalletController } from './services/medicalwallet.controller.v1';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersMedicalWallet } from 'src/orm/entities/users_medicalwallet.entity';
import { UsersMWRepository } from 'src/orm/repositories/users_medicalwallet.repository';
import { MessageService } from 'src/api/internal-services/api-message/message.service';
import { IdService } from 'src/api/internal-services/api-id/id.service';

@Module({
    imports: [TypeOrmModule.forFeature([UsersMedicalWallet])],
    controllers: [MedicalwalletController],
    providers: [MedicalwalletService, UsersMWRepository, MessageService, IdService],
})
export class MedicalwalletModule {}
