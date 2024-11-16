import { Context, Next } from 'koa';
import fs, { ReadStream } from 'fs';
import { logger } from '../../../utils';
import DocumentsService from './documents.service';

export class DocumentsController {
  constructor(private documentsService: DocumentsService) {  }

  async streamToBuffer(stream: ReadStream): Promise<Buffer> {
    const chunks: Uint8Array[] = [];
    for await (const chunk of stream) {
      chunks.push(chunk);
    }
    return Buffer.concat(chunks);
  };

  async add(ctx: Context, next: Next) {
    try {
      const documentFile = ctx.request.files?.file;
      console.log(typeof documentFile);
      console.log(JSON.stringify(documentFile));
      if (!documentFile) {
        ctx.status = 400;
        ctx.body = {
          message: 'Missing body'
        }
        return;
      }

      // @ts-ignore
      const fileStream = fs.createReadStream(documentFile.filepath as string);
      const fileBuffer = await this.streamToBuffer(fileStream);

      await this.documentsService.add(fileBuffer);
      ctx.status = 201;
    } catch(e) {
      logger.error(e);
      ctx.status = 500;
      ctx.body = {
        message: 'Internal Server Error',
      }

    } finally {
      await next();
    }
  }

  async get(_ctx: Context, next: Next) {
    await next();
    return;
  }

  async search(ctx: Context, next: Next) {
    console.log('answer: ', ctx.request.body);

    try {
      const question = ctx.request.body?.question as string;
      if (!question) {
        ctx.status = 400;
        ctx.body = {
          message: 'Missing body'
        }
        return;
      }

      const answer = await this.documentsService.search(question);
      if (!answer) {
        ctx.status = 500;
        ctx.body = {
          message: 'Internal Server Error - Could not generate answer',
        }
      }
      console.log('answer: ', answer);

      ctx.status = 200;
      ctx.body = {
        question,
        answer,
      }
    } catch(e) {
      logger.error(e);
      ctx.status = 500;
      ctx.body = {
        message: 'Internal Server Error',
      }
    } finally {
      await next();
    }
  }
}

export default DocumentsController;
