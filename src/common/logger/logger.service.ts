import { Injectable, Inject, Scope } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService {
    private context: string;

    constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {}

    setContext(context: string) {
        this.context = context;
    }

    private formatMeta(meta: any): object {
        if (typeof meta === 'object' && meta !== null) {
            return meta;
        }
        return { value: meta };
    }

    info(message: string, meta: any = null) {
        this.logger.info(message, { context: this.context, ...this.formatMeta(meta) });
    }

    error(message: string, stack: string = null, meta: any = null) {
        this.logger.error(message, { context: this.context, stack, ...this.formatMeta(meta) });
    }

    warn(message: string, meta: any = null) {
        this.logger.warn(message, { context: this.context, ...this.formatMeta(meta) });
    }

    debug(message: string, meta: any = null) {
        this.logger.debug(message, { context: this.context, ...this.formatMeta(meta) });
    }
}
