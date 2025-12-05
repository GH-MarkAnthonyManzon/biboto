//addded 8:52 pm 12/5/25 ADDED THE WHOLE CODE

'use server';

import { verifySourceCitations } from '@/ai/flows/verify-source-citations';
import { analyzeVerificationResult } from '@/ai/flows/analyze-verification';
import { z } from 'zod';

const VerifyCitationSchema = z.object({
  citationText: z.string().min(10, 'Please enter more text to verify.'),
  sourceUrl: z.string().url('Please enter a valid URL.'),
});

type VerifyState = {
  sources?: string[];
  contextSnippets?: string[];
  aiAnalysis?: {
    summary: string;
    suggestion: string;
    disclaimer: string;
  };
  error?: string;
  message?: string;
};

export async function verifyCitationAction(
  prevState: VerifyState,
  formData: FormData
): Promise<VerifyState> {
  console.log('verifyCitationAction called'); // Debug log
  
  const validatedFields = VerifyCitationSchema.safeParse({
    citationText: formData.get('citationText'),
    sourceUrl: formData.get('sourceUrl'),
  });

  if (!validatedFields.success) {
    const fieldErrors = validatedFields.error.flatten().fieldErrors;
    const errorMessage =
      fieldErrors.citationText?.[0] || fieldErrors.sourceUrl?.[0];
    return {
      error: 'Invalid input. ' + errorMessage,
    };
  }

  try {
    console.log('Starting verification...'); // Debug log
    
    const result = await verifySourceCitations({
      citationText: validatedFields.data.citationText,
      sourceUrl: validatedFields.data.sourceUrl,
    });
    
    console.log('Verification complete, getting AI analysis...'); // Debug log
    
    // Get AI analysis of the verification result
    const aiAnalysis = await analyzeVerificationResult(
      validatedFields.data.citationText,
      validatedFields.data.sourceUrl,
      result.originalSources,
      result.contextSnippets
    );
    
    console.log('AI analysis complete:', aiAnalysis); // Debug log
    
    if (result && result.originalSources.length > 0) {
      return {
        sources: result.originalSources,
        contextSnippets: result.contextSnippets,
        aiAnalysis,
        message: 'Sources found successfully.',
      };
    } else {
      return {
        sources: [],
        contextSnippets: [],
        aiAnalysis,
        message: 'No original sources could be found for the provided text in the given URL.',
      };
    }
  } catch (e) {
    console.error('Error in verifyCitationAction:', e);
    return { 
      error: 'An unexpected error occurred while verifying sources. Please try again.' 
    };
  }
}