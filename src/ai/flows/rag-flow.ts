'use server';
import { Document } from '@langchain/core/documents';
import { HNSWLib } from '@langchain/community/vectorstores/hnswlib';
import {
  GoogleGenerativeAIEmbeddings,
  ChatGoogleGenerativeAI,
} from '@langchain/google-genai';
import {
  RunnablePassthrough,
  RunnableSequence,
} from '@langchain/core/runnables';
import { formatDocumentsAsString } from 'langchain/util/document';
import { StringOutputParser } from '@langchain/core/output_parsers';
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
} from '@langchain/core/prompts';
import { CheerioWebBaseLoader } from 'langchain/document_loaders/web/cheerio';
import { genkit } from 'genkit';
import { z } from 'zod';
import { ai } from '../genkit';

const RagInputSchema = z.object({
  question: z.string(),
  sourceUrl: z.string().url(),
});

type RagInput = z.infer<typeof RagInputSchema>;

async function loadWebDocument(url: string) {
  const loader = new CheerioWebBaseLoader(url);
  const docs = await loader.load();
  return docs;
}

export const ragFlow = ai.defineFlow(
  {
    name: 'ragFlow',
    inputSchema: RagInputSchema,
    outputSchema: z.any(),
  },
  async ({ question, sourceUrl }) => {
    const webDocs = await loadWebDocument(sourceUrl);

    const vectorStore = await HNSWLib.fromDocuments(
      webDocs,
      new GoogleGenerativeAIEmbeddings({ apiKey: process.env.GEMINI_API_KEY })
    );
    const retriever = vectorStore.asRetriever();

    const prompt = ChatPromptTemplate.fromMessages([
      SystemMessagePromptTemplate.fromTemplate(
        `Answer the following question based only on the provided context:\n\n<context>\n{context}\n</context>`
      ),
      HumanMessagePromptTemplate.fromTemplate('Question: {input}'),
    ]);

    const model = new ChatGoogleGenerativeAI({
      apiKey: process.env.GEMINI_API_KEY,
      modelName: 'gemini-1.5-flash-latest',
    });

    const chain = RunnableSequence.from([
      {
        context: retriever.pipe(formatDocumentsAsString),
        input: new RunnablePassthrough(),
      },
      prompt,
      model,
      new StringOutputParser(),
    ]);

    const [answer, context] = await Promise.all([
      chain.invoke(question),
      retriever.getRelevantDocuments(question),
    ]);

    return {
      answer: answer,
      context: context,
    };
  }
);
