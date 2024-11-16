import Router from 'koa-router';
import { documentsController } from '.';
import { requestLogger } from '../../middleware';

const documentsRoutes = new Router({ prefix: '/documents' });

documentsRoutes.post('/', (ctx, next) => documentsController.add(ctx, next), requestLogger);
documentsRoutes.get('/', (ctx, next) => documentsController.get(ctx, next), requestLogger);
documentsRoutes.post('/_search', (ctx, next) => documentsController.search(ctx, next), requestLogger);
export default documentsRoutes.routes();
