import { ragService } from '../../../services';
import DocumentsController from './documents.controller';
import DocumentsService from './documents.service';

const documentsService = new DocumentsService(ragService);
const documentsController = new DocumentsController(documentsService);

export {
  documentsController,
};
