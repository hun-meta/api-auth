import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { UsersMedicalWallet } from '../entities/users_medicalwallet.entity';
import { RegisterDTO } from 'src/medicalwallet/dtos/request.dto';

@Injectable()
export class UsersMWRepository extends Repository<UsersMedicalWallet> {
    constructor(dataSource: DataSource) {
        super(UsersMedicalWallet, dataSource.createEntityManager());
    }

    getTableName(): string {
        return this.metadata.tableName;
    }

    // helper
    private getManager(manager?: EntityManager): EntityManager {
        return manager || this.manager;
    }

    // General-Purpose updater
    private async updateUserField<T extends keyof UsersMedicalWallet>(
        userId: string,
        field: T,
        value: UsersMedicalWallet[T],
        entityManager?: EntityManager,
    ): Promise<boolean> {
        const manager = this.getManager(entityManager);

        const result = await manager.update(UsersMedicalWallet, { id: userId }, { [field]: value });
        return result.affected === 1;
    }

    async findByAccount(account: string, entitiyManager: EntityManager = null): Promise<UsersMedicalWallet | null> {
        const manager = this.getManager(entitiyManager);

        const user = await manager.findOne(UsersMedicalWallet, {
            where: { account: account },
        });

        return user;
    }

    async findByMobile(mobile: string, entitiyManager: EntityManager = null): Promise<UsersMedicalWallet | null> {
        const manager = this.getManager(entitiyManager);

        const user = await manager.findOne(UsersMedicalWallet, {
            where: { mobile: mobile },
        });

        return user;
    }

    async updateMobileToNull(userId: string, entitiyManager: EntityManager = null): Promise<boolean> {
        return await this.updateUserField(userId, 'mobile', null, entitiyManager);
    }

    async createUser(userId: string, registerDto: RegisterDTO, entitiyManager: EntityManager = null){
        const manager = this.getManager(entitiyManager);

        let userData = {
            userId: userId,
            ...registerDto
        };
        const newUser = manager.create(UsersMedicalWallet, userData);
        const result = await manager.save(newUser);
        
        return result.insertedAt;
    }
}
