import '@tensorflow/tfjs-node';
import fs from 'fs';
import path from 'path';
import { TensorFlowEmbeddings } from '@langchain/community/embeddings/tensorflow';
import RagService from './rag.service';
import { logger } from '../utils';

const absolutePath = path.resolve(path + '../../../../../../../.ollama/models');
if (!fs.existsSync(absolutePath)) {
  logger.error('File not found: ', absolutePath);
}

const embeddings = new TensorFlowEmbeddings();
const ragService = new RagService(embeddings);

export {
  ragService,
}
