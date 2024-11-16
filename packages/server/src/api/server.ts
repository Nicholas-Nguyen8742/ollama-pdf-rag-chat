import Koa from 'koa';
import cors from '@koa/cors';
import body from 'koa-body';
import compress from 'koa-compress';
import router from './resources';
import { DATABASE_URL, logger, PORT } from '../utils';

const app = new Koa();

app.use(cors({
  origin: '*',
  exposeHeaders: ['ETag', 'If-None-Match'],
}))
.use(body({
  jsonLimit: '10mb',
  json: true,
  multipart: true,
  formidable: {
    maxFileSize: 200 * 1024 * 1024
  }
}))
.use(compress())
.use(router.routes())
.use(router.allowedMethods());

app.listen(PORT, () => {
  logger.info(`Server listening on PORT: ${PORT}`);
  logger.info(`DATABASE_URL: ${DATABASE_URL}`);
});

export default app;
