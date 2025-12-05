//src/ai/flows/analyze-verification.ts
//added 8:55 pm 12/5/25 ADDED THE WHOLE CODE


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
    console.log('Analyzing verification result...'); // Debug log
    
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not set');
    }

    const model = new ChatGoogleGenerativeAI({
      apiKey: process.env.GEMINI_API_KEY,
      modelName: 'gemini-1.5-flash-latest',
      temperature: 0.5,
    });

    const hasResults = foundSources.length > 0;
    
    const prompt = `You are a helpful AI assistant for "Alamin Natin", a Philippine civic transparency platform.

A user just verified whether a citation/text appears in a source URL.

Citation Text: "${citationText.substring(0, 200)}${citationText.length > 200 ? '...' : ''}"
Source URL: ${sourceUrl}
Result: ${hasResults ? 'FOUND - The citation was found in the source' : 'NOT FOUND - The citation was not found in the source'}
${contextSnippets && contextSnippets.length > 0 ? `\nMatching Context: "${contextSnippets[0].substring(0, 150)}..."` : ''}

Provide a brief, helpful response with EXACTLY:
1. ONE sentence (15-25 words) summarizing what the verification found
2. ONE sentence (15-25 words) suggesting what the user should do next

Guidelines:
- Be concise and direct
- If FOUND: acknowledge the match, suggest checking full context
- If NOT FOUND: suggest possible reasons (paraphrasing, wrong source, content may be elsewhere) and recommend cross-checking other sources
- Be neutral and helpful
- Use simple, clear language

Return ONLY valid JSON in this exact format:
{
  "summary": "One sentence summary here",
  "suggestion": "One sentence suggestion here"
}`;

    console.log('Sending request to Gemini API...'); // Debug log
    const response = await model.invoke(prompt);
    const content = response.content as string;
    console.log('Received response from Gemini API'); // Debug log
    
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