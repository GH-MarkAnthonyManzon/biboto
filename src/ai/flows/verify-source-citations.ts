'use server';

/**
 * @fileOverview This file defines a Genkit flow for verifying source citations.
 *
 * It includes:
 * - verifySourceCitations - A function to verify source citations.
 * - VerifySourceCitationsInput - The input type for the verifySourceCitations function.
 * - VerifySourceCitationsOutput - The return type for the verifySourceCitations function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { ragFlow } from './rag-flow';
import { Document } from '@langchain/core/documents';

const VerifySourceCitationsInputSchema = z.object({
  citationText: z
    .string()
    .describe('The citation text to verify and find original sources for.'),
  sourceUrl: z.string().url().describe('The URL of the source to verify against.'),
});
export type VerifySourceCitationsInput = z.infer<
  typeof VerifySourceCitationsInputSchema
>;

const VerifySourceCitationsOutputSchema = z.object({
  originalSources: z
    .array(z.string().url())
    .describe(
      'A list of URL strings pointing to original sources found for the citation text.'
    ),
});
export type VerifySourceCitationsOutput = z.infer<
  typeof VerifySourceCitationsOutputSchema
>;

const verifySourceCitationsFlow = ai.defineFlow(
  {
    name: 'verifySourceCitationsFlow',
    inputSchema: VerifySourceCitationsInputSchema,
    outputSchema: VerifySourceCitationsOutputSchema,
  },
  async ({ citationText, sourceUrl }) => {
    const result = await ragFlow(citationText, sourceUrl);

    if (result && result.context) {
      const sources = new Set(
        result.context.map((doc: Document) => doc.metadata.source)
      );
      return { originalSources: Array.from(sources) };
    }

    return { originalSources: [] };
  }
);


export async function verifySourceCitations(
  input: VerifySourceCitationsInput
): Promise<VerifySourceCitationsOutput> {
  return verifySourceCitationsFlow(input);
}
