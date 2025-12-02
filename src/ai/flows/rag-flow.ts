'use server';
import { Document } from '@langchain/core/documents';
import { HNSWLib } from '@langchain/community/vectorstores/hnswlib';
import {
  GoogleGenerativeAIEmbeddings,
} from '@langchain/google-genai';
import {
  RunnablePassthrough,
  RunnableSequence,
} from '@langchain/core/runnables';
import { formatDocumentsAsString } from 'langchain/util/document';
import { StringOutputParser } from '@langchain/core/output_parsers';
import {
  ChatPromptTemplate,
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

    const prompt =
      ChatPromptTemplate.fromTemplate(`Answer the following question based only on the provided context:

<context>
{context}
</context>

Question: {input}`);

    const chain = RunnableSequence.from([
      {
        context: retriever.pipe(formatDocumentsAsString),
        input: new RunnablePassthrough(),
      },
      prompt,
      ai.getModel('gemini-2.5-flash'),
      new StringOutputParser(),
    ]);

    // The result of this chain is just the string answer.
    // To get the sources, we need to retrieve them separately.
    const [answer, context] = await Promise.all([
        chain.invoke(question),
        retriever.getRelevantDocuments(question)
    ]);

    return {
      answer: answer,
      context: context,
    };
  }
);
