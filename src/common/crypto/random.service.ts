import { Injectable } from "@nestjs/common";

@Injectable()
export class RandomService {

    /**
     * INFO: return random number
     * @param length length of random number string
     * @returns random number.
     */
    getRandNum(length: number): string {

        if(length < 4){
            length = 4;
        }

        if(length > 10){
            length = 10;
        }

        let result = '';
        for (let i = 0; i < length; i++) {
          // 1자리씩 생성
          result += Math.floor(Math.random() * 10).toString();
        }
    
        return result;
    }
}