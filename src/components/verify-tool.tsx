"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { verifyCitationAction } from "@/app/actions";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Verifying..." : "Verify Source"}
    </Button>
  );
}

export function VerifyTool() {
  const initialState = { message: "", sources: [], error: "" };
  const [state, dispatch] = useActionState(verifyCitationAction, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: state.error,
      });
    }
  }, [state.error, toast]);
  
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Source Verification Tool</CardTitle>
        <CardDescription>
          Enter a piece of text or a citation to find its potential original sources using AI.
          This tool helps trace information back to its root.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={dispatch} className="space-y-4">
          <Textarea
            name="citationText"
            placeholder="e.g., 'According to the 2016 COA report...'"
            rows={5}
            required
          />
          <SubmitButton />
        </form>

        {state.message && !state.sources?.length && (
            <Alert className="mt-4">
              <CheckCircle className="h-4 w-4" />
              <AlertTitle>Result</AlertTitle>
              <AlertDescription>
                {state.message}
              </AlertDescription>
            </Alert>
        )}

        {state.sources && state.sources.length > 0 && (
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Potential Original Sources:</h3>
            <div className="space-y-2">
              {state.sources.map((source, index) => (
                <Alert key={index}>
                  <Terminal className="h-4 w-4" />
                  <AlertTitle>Source {index + 1}</AlertTitle>
                  <AlertDescription>
                     <Link href={source} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline break-all">
                       {source}
                     </Link>
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
