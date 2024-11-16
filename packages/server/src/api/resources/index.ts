import Router from 'koa-router';
import documentsRoutes from './documents/documents.routes';

const router = new Router({
  prefix: '/api'
});

router.use(
  documentsRoutes,
);

export default router;
