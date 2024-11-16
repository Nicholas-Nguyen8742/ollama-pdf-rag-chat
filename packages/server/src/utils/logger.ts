import winston, { transports, format } from 'winston';
import { LOG_LEVEL } from './config';

export const logger = winston.createLogger({
  level: LOG_LEVEL || 'debug',
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.simple(),
      )
    })
  ]
});
