import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from '../../logger/services/logger.service';
import * as fs from 'fs';
import * as path from 'path';
import { EnvUndefinedError } from '../../exception/errors';

@Injectable()
export class KeyService {
    private readonly rootPath: string;

    constructor(
        private readonly logger: LoggerService,
        private readonly config: ConfigService,
    ) {
        this.logger.setContext(KeyService.name);

        let currentDir = __dirname; // get directory path that current file exists
        while (!fs.existsSync(path.join(currentDir, 'package.json'))) {
            // find package.json in currentDir
            currentDir = path.join(currentDir, '..'); // move to the parent directory
        }
        this.rootPath = currentDir;
        // console.log('root: %o', this.rootPath);
    }

    /**
     * INFO: Get Private Key from file
     *
     * @returns private key value as string
     */
    getPrivateKey(): string {
        const privateKeyPath = this.config.get<string>('PRIVATE_KEY_PATH');
        if (!privateKeyPath) {
            throw new EnvUndefinedError(['PRIVATE_KEY_PATH']);
        }

        const fullPath = path.join(this.rootPath, privateKeyPath);

        return fs.readFileSync(fullPath, 'utf-8');
    }

    /**
     * INFO: Get Public Key from file
     *
     * @returns public key value as string
     */
    getPublicKey(): string {
        const publicKeyPath = this.config.get<string>('PUBLIC_KEY_PATH');
        if (!publicKeyPath) {
            throw new EnvUndefinedError(['PUBLIC_KEY_PATH']);
        }

        const fullPath = path.join(this.rootPath, publicKeyPath);

        return fs.readFileSync(fullPath, 'utf-8');
    }
}
