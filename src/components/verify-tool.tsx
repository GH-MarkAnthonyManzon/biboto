'use client';

import { useActionState } from 'react';
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
} from 'lucide-react';
import Link from 'next/link';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Verifying...' : 'Verify Source'}
    </Button>
  );
}

export function VerifyTool() {
  const initialState = { message: '', sources: [], error: '' };
  const [state, dispatch] = useActionState(verifyCitationAction, initialState);

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
          <Input
            name="sourceUrl"
            placeholder="https://example.com/article"
            type="url"
            required
          />
          <Textarea
            name="citationText"
            placeholder="e.g., 'According to the 2016 COA report...'"
            rows={5}
            required
          />
          <SubmitButton />
        </form>

        {state.error && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{state.error}</AlertDescription>
          </Alert>
        )}

        {state.message && (!state.sources || state.sources.length === 0) && (
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
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
