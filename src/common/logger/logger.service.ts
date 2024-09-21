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

  info(message: string, meta: any = null) {
    this.logger.info(message, { context: this.context, ...meta });
  }

  error(message: string, trace: string) {
    this.logger.error(message, { context: this.context, trace });
  }

  warn(message: string, meta: any = null) {
    this.logger.warn(message, { context: this.context, ...meta });
  }

  debug(message: string, meta: any = null) {
    this.logger.debug(message, { context: this.context, ...meta });
  }
}