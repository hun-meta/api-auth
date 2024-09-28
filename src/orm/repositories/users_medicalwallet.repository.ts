import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UsersMedicalWallet } from '../entities/users_medicalwallet.entity';
import { AppController } from 'src/app/services/app.controller.v1';
import { LoggerService } from 'src/common/logger/logger.service';

@Injectable()
export class UsersMWRepository {
    private usersRepository: Repository<UsersMedicalWallet>;

    constructor(
        private readonly logger: LoggerService,
        private readonly dataSource: DataSource
    ) {
        this.logger.setContext(AppController.name);
        this.usersRepository = this.dataSource.getRepository(UsersMedicalWallet);
    }

    // TODO: database with typeorm Error handling
    // TODO: prettier (tab size: 4)
  // User를 account 컬럼으로 찾아서 반환
  async findByAccount(account: string): Promise<UsersMedicalWallet | null>{
    try{
        const user = await this.usersRepository.findOne({
            where: {account: account},
        });
        this.logger.debug("user:", user);
        return user;
    }catch(error){
        this.logger.error("Error occured :", error);
        throw error;
    }
  }
}