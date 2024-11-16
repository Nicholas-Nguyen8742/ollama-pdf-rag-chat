import RagService from '../../../services/rag.service';
import { logger, parsePDF, splitPDFText } from '../../../utils';


export default class DocumentsService {
  constructor(private ragService: RagService) { }

  async add(documentDescriptor: Buffer) {
    const pdfText = await parsePDF(documentDescriptor);
    if (!pdfText) {
      logger.error('Parsing of PDF returned no text or undefined');
      return;
    }

    const splitDocs = await splitPDFText(pdfText);
    await this.ragService.addDocuments(splitDocs);

    return;
  }

  async search(question: string) {
    const answer = await this.ragService.createAnalysis(question);
    if (!answer) {
      logger.error('documents.service - search() - Analysis could not be made');
      return;
    }
    return answer;
  }
}
