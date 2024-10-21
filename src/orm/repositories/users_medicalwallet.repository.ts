import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UsersMedicalWallet } from '../entities/users_medicalwallet.entity';
import { LoggerService } from 'src/common/logger/services/logger.service';

@Injectable()
export class UsersMWRepository {
    private usersRepository: Repository<UsersMedicalWallet>;

    constructor(
        private readonly logger: LoggerService,
        private readonly dataSource: DataSource,
    ) {
        this.logger.setContext(UsersMWRepository.name);
        this.usersRepository = this.dataSource.getRepository(UsersMedicalWallet);
    }

    // User를 account 컬럼으로 찾아서 반환
    async findByAccount(account: string): Promise<UsersMedicalWallet | null> {
        const user = await this.usersRepository.findOne({
            where: { account: account },
        });
        
        return user;
    }
}
