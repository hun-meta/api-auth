import { Module } from '@nestjs/common';
import { MedicalwalletService } from './services/medicalwallet.service';
import { MedicalwalletController } from './services/medicalwallet.controller.v1';
import { LoggerService } from 'src/common/logger/logger.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersMedicalWallet } from 'src/orm/entities/users_medicalwallet.entity';
import { UsersMWRepository } from 'src/orm/repositories/users_medicalwallet.repository';
import { ErrorHandlerService } from 'src/common/exception/handler/error-handler.service';
import { CustomCryptoModule } from 'src/common/crypto/custom-crypto.module';
import { MessageService } from 'src/common/third-party-api/api-message/message.service';

@Module({
    imports: [TypeOrmModule.forFeature([UsersMedicalWallet]), CustomCryptoModule],
    controllers: [MedicalwalletController],
    providers: [MedicalwalletService, LoggerService, UsersMWRepository, ErrorHandlerService, MessageService],
})
export class MedicalwalletModule {}
