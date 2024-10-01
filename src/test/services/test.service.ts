import { Injectable } from '@nestjs/common';

// 임시 변수(실제로는 데이터베이스, 서드파티 API를 통해 값을 조회해야 된다.)
const users: User[] = [
    {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        password: '123456789',
    },
];

@Injectable()
export class TestService {
    async getTestUsers(): Promise<User[]> {
        return users;
    }
}
