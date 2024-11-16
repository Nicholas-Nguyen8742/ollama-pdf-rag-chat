import pdfParse from 'pdf-parse';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';

async function parsePDF(pdfBuffer: Buffer): Promise<string | undefined> {
  const pdfData = await pdfParse(pdfBuffer);
  return pdfData.text;
}

async function splitPDFText(text: string) {
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 20
  });

  const splitDocs = await textSplitter.createDocuments([text]);
  return splitDocs;
}

export {
  parsePDF,
  splitPDFText,
}
