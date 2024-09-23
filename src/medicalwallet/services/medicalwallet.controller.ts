import { Controller } from '@nestjs/common';
import { MedicalwalletService } from './medicalwallet.service';

@Controller('medicalwallet')
export class MedicalwalletController {
  constructor(private readonly medicalwalletService: MedicalwalletService) {}
}
