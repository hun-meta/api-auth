import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from '../../logger/services/logger.service';
import * as bcrypt from 'bcrypt';
import { EnvUndefinedError } from 'src/common/exception/errors';

@Injectable()
export class PasswordService {
    private readonly saltRounds: number;

    constructor(
        private readonly logger: LoggerService,
        private readonly config: ConfigService,
    ) {
        this.logger.setContext(PasswordService.name);
        const tempSaltRounds = this.config.get<string>('SALT_ROUNDS');
        if(!tempSaltRounds){
            throw new EnvUndefinedError(['SALT_ROUNDS']);
        }else{
            this.saltRounds = parseInt(tempSaltRounds);
        }
    }

    /**
     * INFO: Hash password for user registration
     * 
     * @param plainPassword - The plain password to hash
     * @returns Promise<string> - The hashed password
     * @throws Error if hashing fails
     */
    async hashPassword(plainPassword: string): Promise<string> {

        try{
            const hashedPassword = await bcrypt.hash(plainPassword, this.saltRounds);

            return hashedPassword;
        }catch(error){
            this.logger.debug('bcrypt hashing error:', error);
            throw error;
        }
    }

    /**
     * INFO: Compare plain password with hashed password for login
     * 
     * @param plainPassword - The plain password to compare
     * @param hashedPassword - The hashed password from database
     * @returns Promise<boolean> - True if passwords match, false otherwise
     * @throws Error if comparison fails
     */
    async comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
        try {
            const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
            return isMatch;
        } catch (error) {
            throw error;
        }
    }
}
