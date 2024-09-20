import { WinstonModule } from 'nest-winston';
import * as path from 'path';
import * as winston from 'winston';

export const winstonLogger = WinstonModule.forRoot({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.ms(),
        winston.format.colorize(),
        winston.format.printf(({ timestamp, level, message, ms, ...metadata }) => {
          return `${timestamp} [${level}] ${message} ${ms} ${JSON.stringify(metadata)}`;
        })
      ),
    }),
    new winston.transports.File({
      dirname: process.env.LOG_DIR,
      filename: 'application.log',
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
    }),
  ],
});
