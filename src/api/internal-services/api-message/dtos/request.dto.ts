import { IsString, Matches, IsNotEmpty, Validate } from 'class-validator';
import { IsByteLengthConstraint } from 'src/common/decorator/validator';

// api-message SendSms Request data DTO
export class SendSmsDto {
    @IsNotEmpty()
    @IsString()
    @Matches(/^01\d{8,9}$/, {
      message: 'Mobile number must start with 01 and be 10 or 11 digits long.',
    })
    mobile: string;
  
    @IsNotEmpty()
    @IsString()
    @Validate(IsByteLengthConstraint, [90], {
      message: 'Message must be 90 bytes or fewer.',
    })
    message: string;

    static create(mobile: string, message: string): SendSmsDto {
        const dto = new SendSmsDto();
        dto.mobile = mobile;
        dto.message = message;

        return dto;
    }
}