import { Test, TestingModule } from '@nestjs/testing';
import { MedicalwalletService } from './medicalwallet.service';

describe('MedicalwalletService', () => {
    let service: MedicalwalletService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [MedicalwalletService],
        }).compile();

        service = module.get<MedicalwalletService>(MedicalwalletService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
