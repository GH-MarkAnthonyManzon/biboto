//src/ai/flows/analyze-verification.ts
//added 5:41 pm 12/5/25 ADDED THE WHOLE CODE

'use server';

import { ChatGoogleGenerativeAI } from '@langchain/google-genai';

export interface VerificationAnalysis {
  summary: string;
  suggestion: string;
  disclaimer: string;
}

export async function analyzeVerificationResult(
  citationText: string,
  sourceUrl: string,
  foundSources: string[],
  contextSnippets?: string[]
): Promise<VerificationAnalysis> {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not set');
    }

    const model = new ChatGoogleGenerativeAI({
      apiKey: process.env.GEMINI_API_KEY,
      modelName: 'gemini-1.5-flash-latest',
      temperature: 0.5,
    });

    const hasResults = foundSources.length > 0;
    
    const prompt = `You are a helpful assistant for a Philippine civic transparency platform called "Alamin Natin".

A user just verified a citation against a source URL. Here's what happened:

Citation Text: "${citationText.substring(0, 200)}${citationText.length > 200 ? '...' : ''}"
Source URL: ${sourceUrl}
Verification Result: ${hasResults ? 'FOUND - Content matches the source' : 'NOT FOUND - No matching content in source'}
${contextSnippets && contextSnippets.length > 0 ? `\nMatching Context: "${contextSnippets[0].substring(0, 150)}..."` : ''}

Provide a brief, friendly response with:
1. A 1-2 sentence summary of what the verification found
2. A helpful suggestion (1-2 sentences) on what the user should do next

Guidelines:
- Be concise and friendly
- If FOUND: acknowledge the match and suggest checking the full source for complete context
- If NOT FOUND: suggest possible reasons (paraphrasing, different source, or content might be elsewhere) and recommend cross-checking with other sources
- Stay neutral and educational
- Use Filipino context where appropriate (e.g., "Maganda na i-verify sa iba pang sources")

Format as JSON:
{
  "summary": "Brief summary here",
  "suggestion": "Helpful suggestion here"
}`;

    const response = await model.invoke(prompt);
    const content = response.content as string;
    
    // Extract JSON
    let jsonText = content.trim();
    if (jsonText.includes('```json')) {
      jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?$/g, '');
    } else if (jsonText.includes('```')) {
      jsonText = jsonText.replace(/```\n?/g, '');
    }
    
    const analysis = JSON.parse(jsonText);
    
    return {
      summary: analysis.summary || 'Verification complete.',
      suggestion: analysis.suggestion || 'Consider checking additional sources for confirmation.',
      disclaimer: 'Note: AI analysis may contain errors. Always verify with primary sources.',
    };
  } catch (error) {
    console.error('Error analyzing verification:', error);
    // Return fallback response
    return {
      summary: foundSources.length > 0 
        ? 'The citation was found in the provided source.'
        : 'The citation was not found in the provided source.',
      suggestion: foundSources.length > 0
        ? 'Review the full source to understand the complete context.'
        : 'Try checking other sources or look for alternative phrasings of this information.',
      disclaimer: 'Note: AI analysis may contain errors. Always verify with primary sources.',
    };
  }
}