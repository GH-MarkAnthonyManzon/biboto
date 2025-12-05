//added 8:54 pm 12/5/25 ADDED THE WHOLE CODE

'use client';

import { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { verifyCitationAction } from '@/app/actions';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert';
import {
  Terminal,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Sparkles,
  Loader2,
} from 'lucide-react';
import Link from 'next/link';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Verifying...
        </>
      ) : (
        'Verify Source'
      )}
    </Button>
  );
}

export function VerifyTool() {
  const initialState = { 
    message: '', 
    sources: [], 
    contextSnippets: [],
    aiAnalysis: undefined,
    error: '' 
  };
  const [state, dispatch] = useActionState(verifyCitationAction, initialState);

  // Debug: Log state changes
  useEffect(() => {
    console.log('State updated:', state);
  }, [state]);

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Source Verification Tool</CardTitle>
        <CardDescription>
          Enter a URL and a piece of text or a citation. The tool will check if
          the text can be sourced from the content of the provided URL.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={dispatch} className="space-y-4">
          <div>
            <label htmlFor="sourceUrl" className="text-sm font-medium">
              Source URL
            </label>
            <Input
              id="sourceUrl"
              name="sourceUrl"
              placeholder="https://example.com/article"
              type="url"
              required
            />
          </div>
          <div>
            <label htmlFor="citationText" className="text-sm font-medium">
              Citation Text
            </label>
            <Textarea
              id="citationText"
              name="citationText"
              placeholder="e.g., 'According to the 2016 COA report...'"
              rows={5}
              required
            />
          </div>
          <SubmitButton />
        </form>

        {state.error && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{state.error}</AlertDescription>
          </Alert>
        )}

        {state.message && (!state.sources || state.sources.length === 0) && !state.error && (
          <Alert className="mt-4">
            <CheckCircle className="h-4 w-4" />
            <AlertTitle>Result</AlertTitle>
            <AlertDescription>{state.message}</AlertDescription>
          </Alert>
        )}

        {state.sources && state.sources.length > 0 && (
          <div className="mt-6">
            <h3 className="font-semibold mb-2">
              Source Found in Provided URL:
            </h3>
            <div className="space-y-2">
              {state.sources.map((source, index) => (
                <Alert key={index}>
                  <Terminal className="h-4 w-4" />
                  <AlertTitle className="flex items-center justify-between">
                    Source Found
                    <Link
                      href={source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </AlertTitle>
                  <AlertDescription>
                    <p className="truncate">{source}</p>
                    {state.contextSnippets && state.contextSnippets[index] && (
                      <p className="text-xs text-muted-foreground mt-2 italic">
                        "{state.contextSnippets[index].substring(0, 150)}..."
                      </p>
                    )}
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          </div>
        )}

        {state.aiAnalysis && (
          <Alert className="mt-6 bg-primary/5 border-primary/20">
            <Sparkles className="h-4 w-4 text-primary" />
            <AlertTitle className="text-primary">AI Assistant</AlertTitle>
            <AlertDescription className="space-y-3">
              <p className="text-foreground">{state.aiAnalysis.summary}</p>
              <p className="text-foreground font-medium">{state.aiAnalysis.suggestion}</p>
              <p className="text-xs text-muted-foreground italic border-t pt-2">
                {state.aiAnalysis.disclaimer}
              </p>
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}