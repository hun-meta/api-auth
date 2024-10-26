import { Injectable } from '@nestjs/common';

@Injectable()
export class RandomService {
    /**
     * INFO: return random number
     * @param length length of random number string
     * @returns random number.
     */
    getRandNum(length: number): string {
        if (length < 4) {
            length = 4;
        }

        if (length > 10) {
            length = 10;
        }

        let result = '';
        
        // first number shouldn't be 0
        result += Math.floor(Math.random() * 9 + 1).toString();
        for (let i = 1; i < length; i++) {
            result += Math.floor(Math.random() * 10).toString();
        }

        return result;
    }
}
