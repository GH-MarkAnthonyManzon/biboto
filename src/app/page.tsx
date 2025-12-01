import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { BookOpen, Users, Scale, FileCheck2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === "hero-1");

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              {heroImage && (
                <Image
                  alt="Hero"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
                  data-ai-hint="philippines politics"
                  height={600}
                  src={heroImage.imageUrl}
                  width={600}
                />
              )}
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                    Alamin Natin
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Your non-partisan guide to civic transparency. We provide
                    verified, fact-based information on candidates to improve
                    voting literacy among Filipinos.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="/candidates">Explore Candidates</Link>
                  </Button>
                  <Button asChild variant="secondary" size="lg">
                    <Link href="/literacy">Voting Literacy</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  Core Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
                  Informed Decisions, Simplified
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform is designed to provide clear, unbiased, and
                  traceable information.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-2 mt-12">
              <div className="grid gap-1">
                <div className="flex items-center gap-3">
                  <Users className="h-8 w-8 text-primary" />
                  <h3 className="text-lg font-bold font-headline">
                    Candidate Profiles
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Comprehensive, sourced profiles including background, track
                  record, and platforms.
                </p>
              </div>
              <div className="grid gap-1">
                <div className="flex items-center gap-3">
                  <Scale className="h-8 w-8 text-primary" />
                  <h3 className="text-lg font-bold font-headline">
                    Side-by-Side Comparison
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Neutrally compare candidates on experience, policy focus, and
                  history.
                </p>
              </div>
              <div className="grid gap-1">
                <div className="flex items-center gap-3">
                  <BookOpen className="h-8 w-8 text-primary" />
                  <h3 className="text-lg font-bold font-headline">
                    Voting Literacy
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Understand the roles, processes, and how to analyze
                  candidate records.
                </p>
              </div>
               <div className="grid gap-1">
                 <div className="flex items-center gap-3">
                  <FileCheck2 className="h-8 w-8 text-primary" />
                  <h3 className="text-lg font-bold font-headline">
                    Source Verification
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Use our AI tool to check and find original sources for
                  citations.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline">
                Our Commitment to Neutrality
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                This platform aggregates publicly available information from
                official and reputable sources. It does not endorse any
                candidate and exists solely for voter education.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
