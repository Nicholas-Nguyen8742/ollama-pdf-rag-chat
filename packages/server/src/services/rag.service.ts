import { Document } from '@langchain/core/documents';
import { Embeddings } from '@langchain/core/embeddings';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { PromptTemplate } from '@langchain/core/prompts';
import { Ollama } from '@langchain/ollama';
import { createStuffDocumentsChain } from 'langchain/chains/combine_documents';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { logger } from '../utils';

const template = `
  Use the following pieces of context to answer the question at the end.
  If you don't know the answer, just say that you don't know, don't try to make up an answer.
  Use three sentences maximum and keep the answer as concise as possible.
  Always say "thanks for asking!" at the end of the answer.

  {context}

  Question: {question}

  Helpful Answer:
`;

export class RagService {
  model: Ollama;
  memoryVector: MemoryVectorStore;

  constructor(embeddings: Embeddings) {
    this.model = new Ollama({
      baseUrl: 'http://localhost:11434',
      model: 'mistral',
    });
    this.memoryVector = new MemoryVectorStore(embeddings);
  }

  async addDocuments(docs: Document[]): Promise<MemoryVectorStore> {
    await this.memoryVector.addDocuments(docs);
    return this.memoryVector;
  }

  async createAnalysis(query: string) {
    const retriever = this.memoryVector.asRetriever();
    const ragPrompt = PromptTemplate.fromTemplate(template);

    const ragChain = await createStuffDocumentsChain({
      llm: this.model,
      prompt: ragPrompt,
      outputParser: new StringOutputParser()
    });

    const context = await retriever.invoke(query);

    const response = await ragChain.invoke({
      context,
      question: query,
    });
    if (!response) {
      logger.error({
        response
      });
    }

    return response;
  }
}

export default RagService;
