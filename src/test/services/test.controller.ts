import { Controller, Get } from '@nestjs/common';
import { TestService } from './test.service';
import { ClsService } from 'nestjs-cls';
import { UsersResponseDto } from '../dtos/test-users-response.dto';
import { plainToInstance } from 'class-transformer';

@Controller('test')
export class TestController {
    constructor(
        private readonly testService: TestService,
        private readonly cls: ClsService,
    ) {}

    // Default Path
    @Get(``)
    async getTestUsers(): Promise<UsersResponseDto[]> {
        const users = await this.testService.getTestUsers();
        return plainToInstance(UsersResponseDto, users);
    }
}
