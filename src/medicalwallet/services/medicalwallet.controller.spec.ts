import { Test, TestingModule } from '@nestjs/testing';
import { MedicalwalletController } from './medicalwallet.controller';
import { MedicalwalletService } from './medicalwallet.service';

describe('MedicalwalletController', () => {
  let controller: MedicalwalletController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicalwalletController],
      providers: [MedicalwalletService],
    }).compile();

    controller = module.get<MedicalwalletController>(MedicalwalletController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
