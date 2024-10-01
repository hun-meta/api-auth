import { Injectable } from '@nestjs/common';
import { CheckAccountDto } from '../dtos/request.dto';
import { CheckAccountResDto } from '../dtos/response.dto';
import { UsersMWRepository } from 'src/orm/repositories/users_medicalwallet.repository';
import { ConnectionIsNotSetError, ConnectionNotFoundError, QueryFailedError, TypeORMError } from 'typeorm';
import { DatabaseException } from 'src/orm/DatabaseException';

@Injectable()
export class MedicalwalletService {
    constructor(private readonly usersMWRepository: UsersMWRepository) {}

    async checkAccount(checkAccountDto: CheckAccountDto): Promise<CheckAccountResDto> {
        // TODO: TypeORM을 사용해서 Database query 및 중복 여부 확인
        try {
            let available: boolean = false;
            const user = this.usersMWRepository.findByAccount(checkAccountDto.account);
            if (!user) {
                available = true;
            }

            return CheckAccountResDto.create(available);
        } catch (error) {
            if (error instanceof TypeORMError) {
                throw new DatabaseException(error);
            }
            throw error;
        }
    }
}
