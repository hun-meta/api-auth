import { Injectable } from '@nestjs/common';
import { CheckAccountDto } from '../dtos/request.dto';
import { CheckAccountResDto } from '../dtos/response.dto';

@Injectable()
export class MedicalwalletService {
    constructor() {}

    async checkAccount(checkAccountDto: CheckAccountDto): Promise<CheckAccountResDto>{

        // TODO: TypeORM을 사용해서 Database query 및 중복 여부 확인

        const available: boolean = false;
    
        return CheckAccountResDto.create({available: available});
    }
}
