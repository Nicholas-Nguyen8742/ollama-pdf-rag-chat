import { Context, Next } from 'koa';
import { logger } from '../../utils';

export const requestLogger = async (ctx: Context, next: Next): Promise<void> => {
  const message = `${ctx.method} [${ctx.status}] ${ctx.originalUrl}`;
  if (ctx.status >= 400) {
    logger.error(message, ctx.body);
  } else {
    logger.info(message);
  }
  await next();
};